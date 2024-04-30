import { PayTariffPayload, TariffList } from '@common-types/profile';

import { instance } from '../config/axios-config.ts';

export const tariffServices = {
    getTariffList() {
        return instance.get<TariffList>('catalogs/tariff-list');
    },
    payTariff(data: PayTariffPayload) {
        return instance.post('tariff', data);
    },
};
