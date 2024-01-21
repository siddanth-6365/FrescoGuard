
const getRecommendations = (cropType, temperature, moisture, oxygen) => {
    const recommendations = [];
  
    if (temperature) {
      if (cropType === 'wheat' && temperature > 20) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      } else if (cropType === 'rice' && temperature > 30) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      } else if (cropType === 'corn' && temperature > 30) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      }
    }
  
    if (moisture) {
      if (cropType === 'wheat' && moisture > 16) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      } else if (cropType === 'rice' && moisture > 18) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      } else if (cropType === 'corn' && moisture > 18) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      }
    }
  
    if (oxygen) {
      if (cropType === 'wheat' && oxygen > 4) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      } else if (cropType === 'rice' && oxygen > 5) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      } else if (cropType === 'corn' && oxygen > 5) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      }
    }
  
    return recommendations;
  };
  
  module.exports = getRecommendations;
  