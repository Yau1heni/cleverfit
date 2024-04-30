import generatePicker from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
