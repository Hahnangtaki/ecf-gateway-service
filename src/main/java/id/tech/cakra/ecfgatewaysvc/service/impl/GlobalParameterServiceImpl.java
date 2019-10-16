package id.tech.cakra.ecfgatewaysvc.service.impl;

import id.tech.cakra.ecfgatewaysvc.service.GlobalParameterService;
import id.tech.cakra.ecfgatewaysvc.domain.GlobalParameter;
import id.tech.cakra.ecfgatewaysvc.repository.GlobalParameterRepository;
import id.tech.cakra.ecfgatewaysvc.service.dto.GlobalParameterDTO;
import id.tech.cakra.ecfgatewaysvc.service.mapper.GlobalParameterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link GlobalParameter}.
 */
@Service
@Transactional
public class GlobalParameterServiceImpl implements GlobalParameterService {

    private final Logger log = LoggerFactory.getLogger(GlobalParameterServiceImpl.class);

    private final GlobalParameterRepository globalParameterRepository;

    private final GlobalParameterMapper globalParameterMapper;

    public GlobalParameterServiceImpl(GlobalParameterRepository globalParameterRepository, GlobalParameterMapper globalParameterMapper) {
        this.globalParameterRepository = globalParameterRepository;
        this.globalParameterMapper = globalParameterMapper;
    }

    /**
     * Save a globalParameter.
     *
     * @param globalParameterDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public GlobalParameterDTO save(GlobalParameterDTO globalParameterDTO) {
        log.debug("Request to save GlobalParameter : {}", globalParameterDTO);
        GlobalParameter globalParameter = globalParameterMapper.toEntity(globalParameterDTO);
        globalParameter = globalParameterRepository.save(globalParameter);
        return globalParameterMapper.toDto(globalParameter);
    }

    /**
     * Get all the globalParameters.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<GlobalParameterDTO> findAll() {
        log.debug("Request to get all GlobalParameters");
        return globalParameterRepository.findAll().stream()
            .map(globalParameterMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one globalParameter by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GlobalParameterDTO> findOne(Long id) {
        log.debug("Request to get GlobalParameter : {}", id);
        return globalParameterRepository.findById(id)
            .map(globalParameterMapper::toDto);
    }

    /**
     * Delete the globalParameter by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GlobalParameter : {}", id);
        globalParameterRepository.deleteById(id);
    }
}
