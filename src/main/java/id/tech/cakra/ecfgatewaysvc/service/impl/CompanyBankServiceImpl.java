package id.tech.cakra.ecfgatewaysvc.service.impl;

import id.tech.cakra.ecfgatewaysvc.service.CompanyBankService;
import id.tech.cakra.ecfgatewaysvc.domain.CompanyBank;
import id.tech.cakra.ecfgatewaysvc.repository.CompanyBankRepository;
import id.tech.cakra.ecfgatewaysvc.service.dto.CompanyBankDTO;
import id.tech.cakra.ecfgatewaysvc.service.mapper.CompanyBankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link CompanyBank}.
 */
@Service
@Transactional
public class CompanyBankServiceImpl implements CompanyBankService {

    private final Logger log = LoggerFactory.getLogger(CompanyBankServiceImpl.class);

    private final CompanyBankRepository companyBankRepository;

    private final CompanyBankMapper companyBankMapper;

    public CompanyBankServiceImpl(CompanyBankRepository companyBankRepository, CompanyBankMapper companyBankMapper) {
        this.companyBankRepository = companyBankRepository;
        this.companyBankMapper = companyBankMapper;
    }

    /**
     * Save a companyBank.
     *
     * @param companyBankDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CompanyBankDTO save(CompanyBankDTO companyBankDTO) {
        log.debug("Request to save CompanyBank : {}", companyBankDTO);
        CompanyBank companyBank = companyBankMapper.toEntity(companyBankDTO);
        companyBank = companyBankRepository.save(companyBank);
        return companyBankMapper.toDto(companyBank);
    }

    /**
     * Get all the companyBanks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CompanyBankDTO> findAll() {
        log.debug("Request to get all CompanyBanks");
        return companyBankRepository.findAll().stream()
            .map(companyBankMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one companyBank by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompanyBankDTO> findOne(Long id) {
        log.debug("Request to get CompanyBank : {}", id);
        return companyBankRepository.findById(id)
            .map(companyBankMapper::toDto);
    }

    /**
     * Delete the companyBank by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CompanyBank : {}", id);
        companyBankRepository.deleteById(id);
    }
}
