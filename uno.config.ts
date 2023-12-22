import { defineConfig } from 'unocss';
import presetWind from '@unocss/preset-wind';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import presetIcons from '@unocss/preset-icons';
 
export default defineConfig({
    presets: [
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
            }
        }),
        presetWind()
    ],
    transformers: [transformerVariantGroup(), transformerDirectives()],
    theme: {
        colors: {
            primary: 'rgba(var(--color-primary), %alpha)',
            secondary: 'rgba(var(--color-secondary), %alpha)',
            'popover-surface': 'rgba(var(--color-popover-surface), %alpha)',
            on: {
                primary: 'rgba(var(--color-on-primary), %alpha)',
                secondary: 'rgba(var(--color-on-secondary), %alpha)',
                popover: {
                    surface: 'rgba(var(--color-on-popover-surface), %alpha)'
                }
            },
            error: 'rgba(var(--color-error), %alpha)'
        }
    }
});