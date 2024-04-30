import { DATA_TEST_ID } from '@constants/data-test-id';
import Lottie from 'lottie-react';

import loader from './loader.json';

import styles from './loader.module.css';

export const Loader = () => (
    <div className={styles.loaderContainer}>
        <Lottie
            data-test-id={DATA_TEST_ID.loader}
            className={styles.loader}
            animationData={loader}
        />
    </div>
);
