package id.tech.cakra.ecfgatewaysvc.web.rest;

import id.tech.cakra.ecfgatewaysvc.service.GlobalParameterService;
import id.tech.cakra.ecfgatewaysvc.web.rest.errors.BadRequestAlertException;
import id.tech.cakra.ecfgatewaysvc.service.dto.GlobalParameterDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link id.tech.cakra.ecfgatewaysvc.domain.GlobalParameter}.
 */
@RestController
@RequestMapping("/api")
public class GlobalParameterResource {

    private final Logger log = LoggerFactory.getLogger(GlobalParameterResource.class);

    private static final String ENTITY_NAME = "globalParameter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GlobalParameterService globalParameterService;

    public GlobalParameterResource(GlobalParameterService globalParameterService) {
        this.globalParameterService = globalParameterService;
    }

    /**
     * {@code POST  /global-parameters} : Create a new globalParameter.
     *
     * @param globalParameterDTO the globalParameterDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new globalParameterDTO, or with status {@code 400 (Bad Request)} if the globalParameter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/global-parameters")
    public ResponseEntity<GlobalParameterDTO> createGlobalParameter(@Valid @RequestBody GlobalParameterDTO globalParameterDTO) throws URISyntaxException {
        log.debug("REST request to save GlobalParameter : {}", globalParameterDTO);
        if (globalParameterDTO.getId() != null) {
            throw new BadRequestAlertException("A new globalParameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GlobalParameterDTO result = globalParameterService.save(globalParameterDTO);
        return ResponseEntity.created(new URI("/api/global-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /global-parameters} : Updates an existing globalParameter.
     *
     * @param globalParameterDTO the globalParameterDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated globalParameterDTO,
     * or with status {@code 400 (Bad Request)} if the globalParameterDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the globalParameterDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/global-parameters")
    public ResponseEntity<GlobalParameterDTO> updateGlobalParameter(@Valid @RequestBody GlobalParameterDTO globalParameterDTO) throws URISyntaxException {
        log.debug("REST request to update GlobalParameter : {}", globalParameterDTO);
        if (globalParameterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GlobalParameterDTO result = globalParameterService.save(globalParameterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, globalParameterDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /global-parameters} : get all the globalParameters.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of globalParameters in body.
     */
    @GetMapping("/global-parameters")
    public List<GlobalParameterDTO> getAllGlobalParameters() {
        log.debug("REST request to get all GlobalParameters");
        return globalParameterService.findAll();
    }

    /**
     * {@code GET  /global-parameters/:id} : get the "id" globalParameter.
     *
     * @param id the id of the globalParameterDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the globalParameterDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/global-parameters/{id}")
    public ResponseEntity<GlobalParameterDTO> getGlobalParameter(@PathVariable Long id) {
        log.debug("REST request to get GlobalParameter : {}", id);
        Optional<GlobalParameterDTO> globalParameterDTO = globalParameterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(globalParameterDTO);
    }

    /**
     * {@code DELETE  /global-parameters/:id} : delete the "id" globalParameter.
     *
     * @param id the id of the globalParameterDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/global-parameters/{id}")
    public ResponseEntity<Void> deleteGlobalParameter(@PathVariable Long id) {
        log.debug("REST request to delete GlobalParameter : {}", id);
        globalParameterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
