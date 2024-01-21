
const getRecommendations = (cropType, temperature, moisture, oxygen) => {
    const recommendations = [];
  
    if (temperature) {
      if (cropType === 'Wheat' && temperature > 20) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      } else if (cropType === 'Rice' && temperature > 30) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      } else if (cropType === 'Corn' && temperature > 30) {
        recommendations.push('Adjust Ventilation', 'Activate Cooling Systems');
      }
    }
  
    if (moisture) {
      if (cropType === 'Wheat' && moisture > 16) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      } else if (cropType === 'Rice' && moisture > 18) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      } else if (cropType === 'Corn' && moisture > 18) {
        recommendations.push('Enhance Ventilation', 'Dehumidification Systems');
      }
    }
  
    if (oxygen) {
      if (cropType === 'Wheat' && oxygen > 4) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      } else if (cropType === 'Rice' && oxygen > 5) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      } else if (cropType === 'Corn' && oxygen > 5) {
        recommendations.push('Ventilation Improvement', 'Inert Gas Injection');
      }
    }
  
    return recommendations;
  };
  
  module.exports = getRecommendations;
  