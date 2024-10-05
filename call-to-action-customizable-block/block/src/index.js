import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.css';
import './editor.css';

import edit from './edit';
import save from './save';

registerBlockType('call/to-action-block', {
    title: __('Call To Action Block'),
    icon: 'megaphone',
    category: 'common',
    attributes: {
        calltoactionText: {
            type: 'string',
            source: 'html',
            selector: '.callToAction'
        },
        link_text: {
            type: 'string',
            source: 'html',
            selector: '.callToActionButton'
        },
        link_url: {
            type: 'string',
        },
        BGColor: {
            type: 'string',
        },
        buttonColor: {
            type: 'string',
        },
        forColor: {
            type: 'string',
        },
        padding: {
            type: 'number',
            default: 5
        },
        textalign: {
            type: 'string',
            default: 'center'
        },
        BorderStyle: {
            type: 'string',
        },
        imageUrl: {
            type: 'string',
        },
        newpage: {
            type: 'boolean',
            default: false
        },
    },
    edit,
    save,
});
