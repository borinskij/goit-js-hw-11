import axios from 'axios';
import { markupInput, markupCart } from './markup/markup';
import { bodyRef } from './refs/refs';

axios
  .get(
    'https://pixabay.com/api/?key=30088008-597ccc3296e84add455afba6c&q=yellow+flowers&image_type=photo'
  )
  .then(console.log);
