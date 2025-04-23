

import DOMPurify from 'dompurify';

/**
 * 将Map转换为Select组件的options数组。
 * @param map 要转换的Map对象。
 * @returns Select组件的options数组。
 * @example
 * const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * const options = createMapToOptions(myMap);
 * console.log(options); // [{ label: 'value1', value: 'key1' }, { label: 'value2', value: 'key2' }]
 */
type option = { label: string, value: string };
export const createMapToOptions = (map: Map<string, string>,other?:'all'|'un'|option|option[]):option[] => {
    const satrtArr:option[] = [];
    if (other === 'all'){
        satrtArr.push({label:'全部',value:''});
    } else if (other === 'un'){
        satrtArr.push({label:'不限',value:''});
    } else if (getType(other) === 'Array'){
        satrtArr.concat(other as option[]);
    } else if (getType(other) === 'Object'){
        satrtArr.push(other as option);
    }
    return satrtArr.concat(Array.from(map.entries()).map(([key, value]) => ({ label: value, value: key })));
};




export function getType (obj: unknown): string {
    if (obj === null) return 'Null';
    if (obj === undefined) return 'Undefined';

    const typeString = Object.prototype.toString.call(obj);
    switch (typeString) {
        case '[object Array]': return 'Array';
        case '[object Object]': return 'Object';
        case '[object Date]': return 'Date';
        case '[object RegExp]': return 'RegExp';
        case '[object Function]': return 'Function';
        case '[object Map]': return 'Map';
        case '[object Set]': return 'Set';
        case '[object Number]': return 'Number';
        case '[object String]': return 'String';
        case '[object Boolean]': return 'Boolean';
        case '[object Symbol]': return 'Symbol';
        case '[object Error]': return 'Error';
        default: return 'Unknown';
    }
}


export const downloadFile = (url: string, fileName: string):void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // 必须加入DOM才能确保部分浏览器正常下载
    a.click();
    document.body.removeChild(a); // 清理DOM元素

    // 延迟释放资源避免下载中断（仅对blob URL有效）
    if (url.startsWith('blob:')) {
        setTimeout(() => URL.revokeObjectURL(url), 1000 * 60); // 1分钟后自动释放
    }
};


//防止Xss攻击 净化代码
export const cleansing = (text: string): string => {
    if (!text) return '';
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: ['br', 'p', 'span'] });
};

//计算年龄
export const calculateAge = (birthdate: Date | string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    // 计算基准年份差异
    let age = today.getFullYear() - birthDate.getFullYear();

    // 比较月份和日期（使用UTC避免时区影响）
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dateDiff = today.getDate() - birthDate.getDate();

    // 如果生日未过则减1岁
    if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
        age--;
    }

    return age < 0 ? 0 : age; // 防止未来日期返回负数
};



// 防抖函数实现（支持立即执行和尾调用）
export function debounce<T extends (...args: any[]) => any>(//eslint-disable-line
    fn: T,
    delay: number = 200,
    immediate: boolean = false,
): T & { cancel: () => void } {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<T>;
    let lastThis: ThisParameterType<T>;
    let callNow: boolean = immediate;

    const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        // const now = Date.now();
        lastArgs = args;
        lastThis = this;

        if (timerId) {
            clearTimeout(timerId);
        }

        if (immediate && !timerId) {
            fn.apply(lastThis, lastArgs);
            callNow = false;
        }

        timerId = setTimeout(() => {
            if (!immediate && callNow) {
                fn.apply(lastThis, lastArgs);
            }
            timerId = null;
        }, delay);
    } as T & { cancel: () => void };

    // 添加取消方法
    debounced.cancel = function () {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        callNow = false;
    };

    return debounced;
}

// 节流函数实现（支持首次立即执行和尾调用）
export function throttle<T extends (...args: any[]) => any>(//eslint-disable-line
    fn: T,
    limit: number,
    options: { leading?: boolean; trailing?: boolean } = {},
): T {
    let lastFunc: ReturnType<typeof setTimeout> | null = null;
    let lastRan: number | null = null;
    const { leading = true, trailing = true } = options;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const context = this;
        const now = Date.now();

        if (!lastRan && leading) {
            fn.apply(context, args);
            lastRan = now;
        } else {
            clearTimeout(lastFunc!);
            lastFunc = setTimeout(() => {
                if (trailing && now - lastRan >= limit) {
                    fn.apply(context, args);
                    lastRan = now;
                }
            }, limit - (now - lastRan));
        }
    } as T;
}
