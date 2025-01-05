import { Button } from 'antd';
import clsx from 'clsx';
import { FC, useState } from 'react';

import $styles from './style.module.css';

// const StateDemo: FC = () => {
//     const [count, setCount] = useState(1);
//     const [isShow, toggleShow] = useState(true);

//     return (
//         <div className={clsx($styles.container, 'tw-w-[20rem]')}>
//             <h2 className="tw-text-center">useState Demo</h2>
//             {isShow && <p className="tw-text-center tw-py-5">{count}</p>}
//             <div className="tw-flex tw-justify-around">
//                 <Button onClick={() => setCount(count + 1)} type="dashed">
//                     增加
//                 </Button>
//                 <Button onClick={() => setCount(count - 1)} type="dashed">
//                     减少
//                 </Button>
//                 <Button onClick={() => toggleShow(!isShow)} type="dashed">
//                     {isShow ? '显示' : '隐藏'}
//                 </Button>
//             </div>
//         </div>
//     );
// };
const StateDemo: FC = () => {
    const [count, setCount] = useState(1);
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={clsx($styles.container, 'tw-w-[10rem]')}>
            <h2 className="tw-text-center">useState Demo</h2>
            {isShow && <p className="tw-text-center tw-py-5">{count}</p>}
            <div className="tw-flex tw-justify-around ts-w-[50rem]">
                <Button onClick={() => setCount(count + 10)}>+</Button>
                <Button onClick={() => setCount(count - 10)} type="dashed">
                    -
                </Button>
                <Button onClick={() => setIsShow(!isShow)} type="dashed">
                    {!isShow ? '显示' : '隐藏'}
                </Button>
            </div>
        </div>
    );
};

export default StateDemo;
