import Button from 'antd/es/button';
import { FC } from 'react';

import { useStore1 } from '@/libs/store';

export const Counter1: FC = () => {
    const { count, increment, decrement } = useStore1();

    return (
        <div>
            <p>count:{count}</p>
            <Button onClick={() => increment()}>+1</Button>
            <Button onClick={decrement}>-1</Button>
        </div>
    );
};
