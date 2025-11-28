


export const TemplateNameToPath = {
    PullCardBack: "/pullcardback/path",
    template2: "/template2/path",
}

// 获取枚举 - ‘string name’

type TemplateType = keyof typeof TemplateNameToPath;

export const TemplateNameEnum: { [k in TemplateType]: k}  = {} as any;
for( const k in TemplateNameToPath) {
    TemplateNameEnum[k] = k;
}

// 获取 枚举 - ‘ 路径’
// 直接使用 TemplateNameDef