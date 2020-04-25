import moment from 'moment';

export function formatDate(timeStr, form) {
    if (!timeStr || timeStr.length === 0) {
      return '';
    }
    return moment(timeStr)
      .local()
      .format(form);
  }

export function stringYYYYMMDDToMoment(stringVal) {
  return stringVal ? moment(stringVal, "YYYY-MM-DD") : moment();
}

export function momentToStringYYYYMMDD(momentVal) {
  return momentVal ? momentVal.format("YYYY-MM-DD") : "";
}

export function formatDMYMS(timeStr) {
    return formatDate(timeStr, 'HH:mm DD.MM.YYYY');
  }