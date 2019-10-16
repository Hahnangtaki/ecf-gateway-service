package id.tech.cakra.ecfgatewaysvc.service.mapper;

import id.tech.cakra.ecfgatewaysvc.domain.*;
import id.tech.cakra.ecfgatewaysvc.service.dto.BankDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bank} and its DTO {@link BankDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BankMapper extends EntityMapper<BankDTO, Bank> {


    @Mapping(target = "companyBanks", ignore = true)
    @Mapping(target = "removeCompanyBank", ignore = true)
    Bank toEntity(BankDTO bankDTO);

    default Bank fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bank bank = new Bank();
        bank.setId(id);
        return bank;
    }
}
