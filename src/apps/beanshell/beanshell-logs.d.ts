// type Abbreviated<T,M>={[K in keyof T as K|{[P in keyof M]:M[P]extends K?P:never}[keyof M]]:T[K];};
declare type Colors=
  "Black"|"BrightBlack"|"Gray"|"DarkGray"|"BrightGray"|"White"|"BrightWhite"|
  "Blue"|"DarkBlue"|"BrightBlue"|
  "Green"|"DarkGreen"|"BrightGreen"|
  "Cyan"|"DarkCyan"|"BrightCyan"|
  "Red"|"DarkRed"|"BrightRed"|
  "Orange"|"DarkOrange"|"BrightOrange"|
  "Magenta"|"DarkMagenta"|"BrightMagenta"|
  "Yellow"|"DarkYellow"|"BrightYellow"|
  "Transparent";
declare interface ColorTypes{
  /*color*/clr?:Colors;
  /*background*/bg?:Colors;
  /*italics*/i?:boolean;
  /*bold*/b?:boolean;
  /*underline*/u?:boolean;
};
declare interface BeanshellStyledText extends ColorTypes{/*contents*/c?:string;};
declare interface BeanshellLogs extends ColorTypes{
  /*message*/m?:BeanshellStyledText|BeanshellStyledText[]|string;
  /*type*/t:
    "log"|"l"|
    "newline"|"nl"|
    "NerdFontIcon"|"nf";
  includeNewline?:boolean;
  noWordBreak?:boolean;
  customStyling?:CSSProperties;
};