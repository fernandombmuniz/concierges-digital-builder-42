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

export const suggestFirewall = (profile: Profile): string => {
  // Calculate total users
  const currentUsers = profile.infraestrutura.usuariosAtuais;
  const estimatedGrowth = profile.infraestrutura.usuariosPretensao 
    ? (profile.infraestrutura.usuariosEstimativa || 0) 
    : 0;
  const totalUsers = currentUsers + estimatedGrowth;

  // Calculate total throughput from all links
  const totalThroughput = profile.infraestrutura.links.reduce((total, link) => {
    const speed = link.aumentoPretendido && link.novaVelocidade 
      ? parseSpeed(link.novaVelocidade) 
      : parseSpeed(link.velocidade);
    return total + speed;
  }, 0);

  // Find suitable firewalls
  const suitableFirewalls = firewallModels.filter(fw => 
    fw.maxUsers >= totalUsers && fw.throughput >= totalThroughput
  );

  if (suitableFirewalls.length === 0) {
    // If no firewall meets requirements, suggest the most powerful one
    const mostPowerful = firewallModels.reduce((max, fw) => 
      (fw.maxUsers > max.maxUsers || (fw.maxUsers === max.maxUsers && fw.throughput > max.throughput)) ? fw : max
    );
    return `${mostPowerful.brand} ${mostPowerful.model}`;
  }

  // Sort by capacity (smallest first for most economical option)
  suitableFirewalls.sort((a, b) => {
    if (a.maxUsers !== b.maxUsers) return a.maxUsers - b.maxUsers;
    return a.throughput - b.throughput;
  });

  // Check if we can suggest a lower model for "baixo" usage profile
  if (profile.infraestrutura.perfilUso === 'baixo' && suitableFirewalls.length > 1) {
    // Find the recommended model index
    const recommendedIndex = 0; // First suitable model
    
    // Check if there's a model one level below in the same brand
    const recommendedModel = suitableFirewalls[recommendedIndex];
    const sameBrandModels = firewallModels.filter(fw => fw.brand === recommendedModel.brand);
    const modelIndex = sameBrandModels.findIndex(fw => 
      fw.model === recommendedModel.model && fw.maxUsers === recommendedModel.maxUsers
    );
    
    if (modelIndex > 0) {
      const lowerModel = sameBrandModels[modelIndex - 1];
      // Only suggest lower model if it still covers at least 80% of requirements
      if (lowerModel.maxUsers >= totalUsers * 0.8 && lowerModel.throughput >= totalThroughput * 0.8) {
        return `${lowerModel.brand} ${lowerModel.model}`;
      }
    }
  }

  // Return the most economical suitable option
  const suggested = suitableFirewalls[0];
  return `${suggested.brand} ${suggested.model}`;
};