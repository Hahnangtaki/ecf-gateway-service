package id.tech.cakra.ecfgatewaysvc.web.rest;

import id.tech.cakra.ecfgatewaysvc.service.CompanyBankService;
import id.tech.cakra.ecfgatewaysvc.web.rest.errors.BadRequestAlertException;
import id.tech.cakra.ecfgatewaysvc.service.dto.CompanyBankDTO;

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
 * REST controller for managing {@link id.tech.cakra.ecfgatewaysvc.domain.CompanyBank}.
 */
@RestController
@RequestMapping("/api")
public class CompanyBankResource {

    private final Logger log = LoggerFactory.getLogger(CompanyBankResource.class);

    private static final String ENTITY_NAME = "companyBank";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompanyBankService companyBankService;

    public CompanyBankResource(CompanyBankService companyBankService) {
        this.companyBankService = companyBankService;
    }

    /**
     * {@code POST  /company-banks} : Create a new companyBank.
     *
     * @param companyBankDTO the companyBankDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new companyBankDTO, or with status {@code 400 (Bad Request)} if the companyBank has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/company-banks")
    public ResponseEntity<CompanyBankDTO> createCompanyBank(@Valid @RequestBody CompanyBankDTO companyBankDTO) throws URISyntaxException {
        log.debug("REST request to save CompanyBank : {}", companyBankDTO);
        if (companyBankDTO.getId() != null) {
            throw new BadRequestAlertException("A new companyBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyBankDTO result = companyBankService.save(companyBankDTO);
        return ResponseEntity.created(new URI("/api/company-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /company-banks} : Updates an existing companyBank.
     *
     * @param companyBankDTO the companyBankDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companyBankDTO,
     * or with status {@code 400 (Bad Request)} if the companyBankDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the companyBankDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/company-banks")
    public ResponseEntity<CompanyBankDTO> updateCompanyBank(@Valid @RequestBody CompanyBankDTO companyBankDTO) throws URISyntaxException {
        log.debug("REST request to update CompanyBank : {}", companyBankDTO);
        if (companyBankDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyBankDTO result = companyBankService.save(companyBankDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, companyBankDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /company-banks} : get all the companyBanks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of companyBanks in body.
     */
    @GetMapping("/company-banks")
    public List<CompanyBankDTO> getAllCompanyBanks() {
        log.debug("REST request to get all CompanyBanks");
        return companyBankService.findAll();
    }

    /**
     * {@code GET  /company-banks/:id} : get the "id" companyBank.
     *
     * @param id the id of the companyBankDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the companyBankDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/company-banks/{id}")
    public ResponseEntity<CompanyBankDTO> getCompanyBank(@PathVariable Long id) {
        log.debug("REST request to get CompanyBank : {}", id);
        Optional<CompanyBankDTO> companyBankDTO = companyBankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(companyBankDTO);
    }

    /**
     * {@code DELETE  /company-banks/:id} : delete the "id" companyBank.
     *
     * @param id the id of the companyBankDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/company-banks/{id}")
    public ResponseEntity<Void> deleteCompanyBank(@PathVariable Long id) {
        log.debug("REST request to delete CompanyBank : {}", id);
        companyBankService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
