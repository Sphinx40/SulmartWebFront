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
