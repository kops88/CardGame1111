// import "../Template/Pull_CardBack" 相对于 TemplateBility







// 名字到路径,只在获取ts类（require）时使用
export const TemplateNameToPath = { 
    Pull_CardBack: "../Template/Pull_CardBack",

}

// 枚举到string
type NameType  = keyof typeof TemplateNameToPath;
export const TemplateNameEnum: { [k in NameType]: k} = {} as any;
for( const k in TemplateNameToPath) { 
    TemplateNameEnum[k] = k;
}










export const ViewNameToPath = { 
    a: " patha ",

}

type ViewNameType = keyof typeof ViewNameToPath;
export const ViewNameEnum: { [k in ViewNameType]: k} = {} as any;
for( const k in ViewNameToPath) { 
    ViewNameEnum[k] = k;
}