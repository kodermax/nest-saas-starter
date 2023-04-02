import * as _emotion_utils from '@emotion/utils';
import { ReactNode } from 'react';

declare function createEmotionCache(): _emotion_utils.EmotionCache;

type BgBlurProps = {
    blur?: number;
    opacity?: number;
    color?: string;
    imgUrl?: string;
};
declare function bgBlur(props?: BgBlurProps): {
    readonly position: "relative";
    readonly backgroundImage: `url(${string})`;
    readonly '&:before': {
        readonly position: "absolute";
        readonly top: 0;
        readonly left: 0;
        readonly zIndex: 9;
        readonly content: "\"\"";
        readonly width: "100%";
        readonly height: "100%";
        readonly backdropFilter: `blur(${number}px)`;
        readonly WebkitBackdropFilter: `blur(${number}px)`;
        readonly backgroundColor: string;
    };
    backdropFilter?: undefined;
    WebkitBackdropFilter?: undefined;
    backgroundColor?: undefined;
} | {
    backdropFilter: string;
    WebkitBackdropFilter: string;
    backgroundColor: string;
    readonly position?: undefined;
    readonly backgroundImage?: undefined;
    readonly '&:before'?: undefined;
};
type BgGradientProps = {
    direction?: string;
    color?: string;
    startColor?: string;
    endColor?: string;
    imgUrl?: string;
};
declare function bgGradient(props?: BgGradientProps): {
    background: string;
    backgroundSize: string;
    backgroundRepeat: string;
    backgroundPosition: string;
} | {
    background: string;
    backgroundSize?: undefined;
    backgroundRepeat?: undefined;
    backgroundPosition?: undefined;
};
declare function textGradient(value: string): {
    background: string;
    WebkitBackgroundClip: string;
    WebkitTextFillColor: string;
};
declare function filterStyles(value: string): {
    filter: string;
    WebkitFilter: string;
    MozFilter: string;
};
declare const hideScrollbarY: {
    readonly msOverflowStyle: "none";
    readonly scrollbarWidth: "none";
    readonly overflowY: "scroll";
    readonly '&::-webkit-scrollbar': {
        readonly display: "none";
    };
};
declare const hideScrollbarX: {
    readonly msOverflowStyle: "none";
    readonly scrollbarWidth: "none";
    readonly overflowX: "scroll";
    readonly '&::-webkit-scrollbar': {
        readonly display: "none";
    };
};

type Props$1 = {
    children: React.ReactNode;
};
declare function ThemeProvider({ children }: Props$1): JSX.Element;

type ColorVariants = {
    name: string;
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
};
type ThemeModeValue = 'light' | 'dark';
type ThemeDirectionValue = 'rtl' | 'ltr';
type ThemeContrastValue = 'default' | 'bold';
type ThemeLayoutValue = 'vertical' | 'horizontal' | 'mini';
type ThemeColorPresetsValue = 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
type ThemeStretchValue = boolean;
type SettingsValueProps = {
    themeMode: ThemeModeValue;
    themeLayout: ThemeLayoutValue;
    themeStretch: ThemeStretchValue;
    themeContrast: ThemeContrastValue;
    themeDirection: ThemeDirectionValue;
    themeColorPresets: ThemeColorPresetsValue;
};
type SettingsContextProps = SettingsValueProps & {
    presetsColor: ColorVariants;
    presetsOption: {
        name: string;
        value: string;
    }[];
    onToggleMode: VoidFunction;
    onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleDirection: VoidFunction;
    onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDirectionByLang: (lang: string) => void;
    onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleContrast: VoidFunction;
    onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeColorPresets: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleStretch: VoidFunction;
    onResetSetting: VoidFunction;
};

declare const useSettingsContext: () => SettingsContextProps;
type SettingsProviderProps = {
    children: ReactNode;
};
declare function SettingsProvider({ children }: SettingsProviderProps): JSX.Element;

type Props = {
    children: React.ReactNode;
};
declare function ThemeSettings({ children }: Props): JSX.Element;

export { SettingsContextProps, SettingsProvider, SettingsValueProps, ThemeColorPresetsValue, ThemeContrastValue, ThemeDirectionValue, ThemeLayoutValue, ThemeModeValue, ThemeProvider, ThemeSettings, ThemeStretchValue, bgBlur, bgGradient, createEmotionCache, filterStyles, hideScrollbarX, hideScrollbarY, textGradient, useSettingsContext };
