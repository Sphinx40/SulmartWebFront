export const splitByCommaAndReturnStreetName = text => {
  let streetArray = text.split(',');
  let result = '';
  streetArray.forEach(item => {
    if (
      item.includes('улица') ||
      item.includes('проспект') ||
      item.includes('даңғылы') ||
      item.includes('көшесі')
    ) {
      result = item;
    }
  });
  if (result === '') {
    streetArray.forEach(item => {
      if (item.includes('микрорайон')) {
        result = item;
      }
    });
  }

  return result;
};

export const removeStreetWord = text => {
  let tempText = text;

  tempText = tempText.replace('улица ', '');
  tempText = tempText.replace(' улица', '');
  tempText = tempText.replace('улица', '');

  tempText = tempText.replace('проспект ', '');
  tempText = tempText.replace(' проспект', '');
  tempText = tempText.replace('проспект', '');

  tempText = tempText.replace('даңғылы ', '');
  tempText = tempText.replace(' даңғылы', '');
  tempText = tempText.replace('даңғылы', '');

  tempText = tempText.replace('көшесі ', '');
  tempText = tempText.replace(' көшесі', '');
  tempText = tempText.replace('көшесі', '');
  return tempText;
};

export const rad = x => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
  let p1Latitude = p1[0];
  let p1Longitude = p1[1];

  let p2Latitude = p2[0];
  let p2Longitude = p2[1];

  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2Latitude - p1Latitude);
  var dLong = rad(p2Longitude - p1Longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1Latitude)) *
      Math.cos(rad(p2Latitude)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

export const calculateDeliveryCost = (
  cityCenterCoords,
  marketCoords,
  deliveryAddressCoords
) => {
  let result = { boolean: false, deliveryPrice: 0 };
  if (marketCoords === null || marketCoords.length === 0) {
    return result;
  }
  if (cityCenterCoords === null || cityCenterCoords.length === 0) {
    return result;
  }
  if (deliveryAddressCoords === null || deliveryAddressCoords.length === 0) {
    return result;
  }

  const shortDistancePrice = 1000;
  const averageDistancePrice = 1500;
  const longDistancePrice = 2000;

  const shortDistanceMeterMin = 0;
  const averageDistanceMeterMin = 3000;
  const longDistanceMeterMin = 10000;

  const deliveryDistanceFromCityCenterMeterMax = 7000;

  const distanceFromCityCenter = getDistance(
    cityCenterCoords,
    deliveryAddressCoords
  );

  const distanceFromShop = getDistance(marketCoords, deliveryAddressCoords);

  if (distanceFromCityCenter > deliveryDistanceFromCityCenterMeterMax) {
    return result;
  } else {
    result.boolean = true;
  }

  if (
    distanceFromShop > shortDistanceMeterMin &&
    distanceFromShop < averageDistanceMeterMin
  ) {
    result.deliveryPrice = shortDistancePrice;
    return result;
  } else if (
    distanceFromShop >= averageDistanceMeterMin &&
    distanceFromShop < longDistanceMeterMin
  ) {
    result.deliveryPrice = averageDistancePrice;
    return result;
  } else {
    result.deliveryPrice = longDistancePrice;
    return result;
  }

  return result;
};
