import { Profile } from '@/types/profile';

interface FirewallModel {
  brand: 'SonicWall' | 'Fortinet';
  model: string;
  maxUsers: number;
  throughput: number; // in Mbps
}

const firewallModels: FirewallModel[] = [
  // SonicWall
  { brand: 'SonicWall', model: 'TZ80', maxUsers: 60, throughput: 750 },
  { brand: 'SonicWall', model: 'TZ370', maxUsers: 100, throughput: 1000 },
  { brand: 'SonicWall', model: 'TZ470', maxUsers: 150, throughput: 1500 },
  { brand: 'SonicWall', model: 'TZ570', maxUsers: 200, throughput: 2000 },
  { brand: 'SonicWall', model: 'TZ670', maxUsers: 250, throughput: 2500 },
  { brand: 'SonicWall', model: 'NSA 2700', maxUsers: 300, throughput: 3000 },
  { brand: 'SonicWall', model: 'NSA 3700', maxUsers: 400, throughput: 3500 },
  
  // Fortinet
  { brand: 'Fortinet', model: '40F', maxUsers: 60, throughput: 600 },
  { brand: 'Fortinet', model: '50G', maxUsers: 120, throughput: 1100 },
  { brand: 'Fortinet', model: '90G', maxUsers: 200, throughput: 2200 },
  { brand: 'Fortinet', model: '120G', maxUsers: 250, throughput: 2800 },
  { brand: 'Fortinet', model: '200F', maxUsers: 300, throughput: 3000 },
  { brand: 'Fortinet', model: '200G', maxUsers: 500, throughput: 6000 },
  { brand: 'Fortinet', model: '600F', maxUsers: 700, throughput: 10500 },
];

const parseSpeed = (speedStr: string): number => {
  const speed = speedStr.toLowerCase().replace(/[^0-9.,]/g, '');
  const numericSpeed = parseFloat(speed.replace(',', '.'));
  
  if (speedStr.toLowerCase().includes('gbps')) {
    return numericSpeed * 1000;
  }
  return numericSpeed;
};

export const suggestFirewall = (profile: Profile): { sonicwall: string; fortinet: string } => {
  // Calculate total users - use estimated users if user plans to increase
  const totalUsers = profile.infraestrutura.usuariosPretensao 
    ? (profile.infraestrutura.usuariosEstimativa || profile.infraestrutura.usuariosAtuais)
    : profile.infraestrutura.usuariosAtuais;

  // Calculate total throughput from all links
  const totalThroughput = profile.infraestrutura.links.reduce((total, link) => {
    const speed = link.aumentoPretendido && link.novaVelocidade 
      ? parseSpeed(link.novaVelocidade) 
      : parseSpeed(link.velocidade);
    return total + speed;
  }, 0);

  // Separate firewalls by brand
  const sonicwallModels = firewallModels.filter(fw => fw.brand === 'SonicWall');
  const fortinetModels = firewallModels.filter(fw => fw.brand === 'Fortinet');

  // Find suitable firewalls for each brand
  const suitableSonicwall = sonicwallModels.filter(fw => 
    fw.maxUsers >= totalUsers && fw.throughput >= totalThroughput
  );
  
  const suitableFortinet = fortinetModels.filter(fw => 
    fw.maxUsers >= totalUsers && fw.throughput >= totalThroughput
  );

  // Get SonicWall suggestion
  let sonicwallSuggestion: string;
  if (suitableSonicwall.length === 0) {
    const mostPowerfulSonicwall = sonicwallModels.reduce((max, fw) => 
      (fw.maxUsers > max.maxUsers || (fw.maxUsers === max.maxUsers && fw.throughput > max.throughput)) ? fw : max
    );
    sonicwallSuggestion = mostPowerfulSonicwall.model;
  } else {
    suitableSonicwall.sort((a, b) => {
      if (a.maxUsers !== b.maxUsers) return a.maxUsers - b.maxUsers;
      return a.throughput - b.throughput;
    });
    sonicwallSuggestion = suitableSonicwall[0].model;
  }

  // Get Fortinet suggestion
  let fortinetSuggestion: string;
  if (suitableFortinet.length === 0) {
    const mostPowerfulFortinet = fortinetModels.reduce((max, fw) => 
      (fw.maxUsers > max.maxUsers || (fw.maxUsers === max.maxUsers && fw.throughput > max.throughput)) ? fw : max
    );
    fortinetSuggestion = mostPowerfulFortinet.model;
  } else {
    suitableFortinet.sort((a, b) => {
      if (a.maxUsers !== b.maxUsers) return a.maxUsers - b.maxUsers;
      return a.throughput - b.throughput;
    });
    fortinetSuggestion = suitableFortinet[0].model;
  }

  return {
    sonicwall: sonicwallSuggestion,
    fortinet: fortinetSuggestion
  };
};