// import "../Template/Pull_CardBack" 相对于 TemplateBility

// 名字到路径
export const TemplateNameToPath = { 
    Pull_CardBack: "../Template/Pull_CardBack",

}

// 枚举到string
type NameType  = keyof typeof TemplateNameToPath;
export const TemplateNameEnum: { [k in NameType]: k} = {} as any;
for( const k in TemplateNameToPath) { 
    TemplateNameEnum[k] = k;
}