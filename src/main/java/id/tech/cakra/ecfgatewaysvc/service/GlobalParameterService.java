package id.tech.cakra.ecfgatewaysvc.service;

import id.tech.cakra.ecfgatewaysvc.service.dto.GlobalParameterDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.tech.cakra.ecfgatewaysvc.domain.GlobalParameter}.
 */
public interface GlobalParameterService {

    /**
     * Save a globalParameter.
     *
     * @param globalParameterDTO the entity to save.
     * @return the persisted entity.
     */
    GlobalParameterDTO save(GlobalParameterDTO globalParameterDTO);

    /**
     * Get all the globalParameters.
     *
     * @return the list of entities.
     */
    List<GlobalParameterDTO> findAll();


    /**
     * Get the "id" globalParameter.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GlobalParameterDTO> findOne(Long id);

    /**
     * Delete the "id" globalParameter.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
