import { error, Stack } from '@pnotify/core';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function notification(text = 'Snth. wrong!', type = 'error') {
  const notify = new Stack({
    dir1: 'down',
    dir2: 'left',
    firstpos1: 40,
    firstpos2: 40,
  });

  const options = {
    type: type,
    title: 'ERROR',
    text: text,
    styling: 'brighttheme',
    delay: 2000,
    shadow: true,
    stack: notify,
  };

  error(options);
}
