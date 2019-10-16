package id.tech.cakra.ecfgatewaysvc.service.mapper;

import id.tech.cakra.ecfgatewaysvc.domain.*;
import id.tech.cakra.ecfgatewaysvc.service.dto.CurrencyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Currency} and its DTO {@link CurrencyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CurrencyMapper extends EntityMapper<CurrencyDTO, Currency> {


    @Mapping(target = "companyBanks", ignore = true)
    @Mapping(target = "removeCompanyBank", ignore = true)
    Currency toEntity(CurrencyDTO currencyDTO);

    default Currency fromId(Long id) {
        if (id == null) {
            return null;
        }
        Currency currency = new Currency();
        currency.setId(id);
        return currency;
    }
}
