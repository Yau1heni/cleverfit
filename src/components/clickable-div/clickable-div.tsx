import { CSSProperties, FC, KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';

export const ClickableDiv: FC<Props> = (props) => {
    const { onClick, isPreventBubbling, children, className, style, dataTestId } = props;

    const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClick(e);
        }
    };

    const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (isPreventBubbling) {
            e.stopPropagation();
        }
        onClick(e);
    };

    return (
        <div
            role='button'
            tabIndex={0}
            className={className}
            style={style}
            onClick={onClickHandler}
            onKeyDown={keyDownHandler}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

type Props = {
    onClick: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
    className?: string;
    style?: CSSProperties;
    dataTestId?: string;
    isPreventBubbling?: boolean;
} & PropsWithChildren;
