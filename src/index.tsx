import { createRoot } from 'react-dom/client';
import { Text } from '@tde2803/design-system';

const rootElement = document.querySelector('#root') as HTMLElement;

const root = createRoot(rootElement);

root.render(<Text size="s">Hello world</Text>);
