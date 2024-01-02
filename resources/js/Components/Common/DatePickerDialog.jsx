import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './date-picker-dialog.css';
import DatePicker from 'react-date-picker';

function DatePickerDialog(props) {
  return <DatePicker {...props} />;
}

export default DatePickerDialog;
