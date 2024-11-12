import './index.css';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import PlusWebp from './components/plus-webp';

domReady( () => {
    const root = createRoot(
        document.getElementById( 'plus-webp-page' )
    );

    root.render( <PlusWebp /> );
} );
