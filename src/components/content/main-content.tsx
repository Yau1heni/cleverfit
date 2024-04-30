import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { onPageTurn } from '@utils/on-page-turn';
import { Col, Row, Typography } from 'antd';

import { CardItem } from './card-item/card-item.tsx';
import { itemsCards } from './card-item/data/items.tsx';

import styles from './main-content.module.css';

export const MainContent = () => {
    const dispatch = useAppDispatch();

    const onPageTurnHandler = (key: string) => {
        onPageTurn(key, dispatch);
    };

    const cardsList = itemsCards.map((card) => (
        <Col key={card.id} md={8} sm={24} xs={24}>
            <CardItem
                Icon={card.icon}
                title={card.title}
                text={card.text}
                dataTestId={card.dataTestId}
                onclick={() => onPageTurnHandler(card.text)}
            />
        </Col>
    ));

    return (
        <div className={styles.mainContentContainer}>
            <Typography.Paragraph className={styles.textTarget}>
                С CleverFit ты сможешь:
                <br /> — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                с нормами и рекордами;
                <br /> — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                тренировках;
                <br /> — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </Typography.Paragraph>

            <Typography.Paragraph className={styles.description}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </Typography.Paragraph>
            <Row gutter={[16, 8]}>{cardsList}</Row>
        </div>
    );
};
