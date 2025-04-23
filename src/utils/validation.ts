import {messageMap,triggerMap} from './validationMap';

type ValidationRuleRequired ={
    validator?: (rule: any, value: any) => boolean;// eslint-disable-line
    required?: boolean,
    message?: string,
    trigger: string,
}

type ValueBranch =(ReturnType<typeof messageMap.get> extends infer V
    ? V extends { [key: string]: any }// eslint-disable-line
        ? keyof V
        : never
    : never)


// 通用校验规则
export const requiredItem = ({key,branch = 'default',trigger = 'blur',required = true}:{key:string ,branch?:ValueBranch,trigger?:string,required?:boolean}):ValidationRuleRequired => {
    const target = messageMap.get(key)?.[branch] || `| messageMap缺乏字段 ${key} |`;
    const message = `请${triggerMap.get(trigger)}` + target;
    return {
        required,
        message,
        trigger,
    };
};

type CreateRequired=Record<string,ValidationRuleRequired>

export const createRulesList = (ArrayKeys:string[],trigger:string = 'blur',required:boolean = true):CreateRequired => {

    return ArrayKeys.reduce((acc,key) => {
        acc[key] = requiredItem({key,trigger,required});
        return acc;
    },{} as CreateRequired);
};


type ValidationRules = Record<string, ValidationRuleRequired | ValidationRuleRequired[]>;

export class ValidationBase {
    private rules: ValidationRules;
    constructor (rules: ValidationRules) {
        this.rules = rules;
    }
    getRules (): ValidationRules {
        return this.rules;
    }
    getMessage (key: string):string | undefined {
        const rule = this.rules[key];
        if (Array.isArray(rule)) return rule.find(r => r.message)?.message;
        return rule?.message;
    }

}




// 求职意向专用校验
export const careerValidations = new ValidationBase({
    ...createRulesList(['expectPosition','expectCategory','expectCity'],'change'),
    expectIndustry: [{
        required: true,
        validator: (_, val:number[]):boolean => val.length > 0,
        message: '请至少选择一个期望行业',
        trigger: 'change',
    }],
});



// 工作经历专用校验
export const ExperienceValidations = new ValidationBase({
    ...createRulesList(['company','position','expectCategory','description']),
    salary: [requiredItem({key:'salary'}),
        {
            required: true,
            validator: (_, val:number):boolean => val > 0,
            message: '薪资应大于0',
            trigger: 'change',
        },
    ],
});


// 教育背景专用校验
export const EducationalValidations = new ValidationBase({
    ...createRulesList(['school','major']),
    ...createRulesList(['degree','isFullTime'],'change'),
});


// 项目经历专用校验
export const ProjectsValidations = new ValidationBase({
    ...createRulesList(['title','role','description']),
    techStack:requiredItem({key:'techStack',trigger:'change'}),
});

// 语言能力专用校验
export const LanguageValidations = new ValidationBase({
    ...createRulesList(['language','LSLevel','literacyLevel'],'change'),
});

// 专业技能专用校验
export const SkillValidations = new ValidationBase({
    name:requiredItem({key:'name',branch:'skill'}),
    time:requiredItem({key:'time'}), // 掌握时间,月算
    level:requiredItem({key:'level',trigger:'change'}),
});

// 培训经历专用校验
export const TrainingValidations = new ValidationBase({
    ...createRulesList(['name','course']),
});

// 个人项目专用校验
export const WorksValidations = new ValidationBase({
    ...createRulesList(['title','url']),
});

// j基础信息专用校验
export const BasicInfoValidations = new ValidationBase({
    ...createRulesList(['gender','avatar','birthday','city'],'change'),
    ...createRulesList(['name','url','phone','email','education']),
});
