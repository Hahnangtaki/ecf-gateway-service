package id.tech.cakra.ecfgatewaysvc.web.rest;

import id.tech.cakra.ecfgatewaysvc.EcfgatewaysvcApp;
import id.tech.cakra.ecfgatewaysvc.domain.GlobalParameter;
import id.tech.cakra.ecfgatewaysvc.repository.GlobalParameterRepository;
import id.tech.cakra.ecfgatewaysvc.service.GlobalParameterService;
import id.tech.cakra.ecfgatewaysvc.service.dto.GlobalParameterDTO;
import id.tech.cakra.ecfgatewaysvc.service.mapper.GlobalParameterMapper;
import id.tech.cakra.ecfgatewaysvc.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static id.tech.cakra.ecfgatewaysvc.web.rest.TestUtil.sameInstant;
import static id.tech.cakra.ecfgatewaysvc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GlobalParameterResource} REST controller.
 */
@SpringBootTest(classes = EcfgatewaysvcApp.class)
public class GlobalParameterResourceIT {

    private static final String DEFAULT_PARAM_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PARAM_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PARAM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARAM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PARAM_TYPE = "A";
    private static final String UPDATED_PARAM_TYPE = "B";

    private static final Integer DEFAULT_INT_VALUE = 1;
    private static final Integer UPDATED_INT_VALUE = 2;

    private static final Float DEFAULT_FLOAT_VALUE = 1F;
    private static final Float UPDATED_FLOAT_VALUE = 2F;

    private static final String DEFAULT_STRING_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_STRING_VALUE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_VALUE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VALUE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_SHOW = false;
    private static final Boolean UPDATED_SHOW = true;

    private static final Boolean DEFAULT_EDIT = false;
    private static final Boolean UPDATED_EDIT = true;

    private static final LocalDate DEFAULT_CREATE_SYSTEM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_SYSTEM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_CREATE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_CREATE_USER_ID = 1L;
    private static final Long UPDATED_CREATE_USER_ID = 2L;

    private static final LocalDate DEFAULT_LAST_MODIFICATION_SYSTEM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFICATION_SYSTEM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_LAST_MODIFICATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFICATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_LAST_MODIFICATION_USER_ID = 1L;
    private static final Long UPDATED_LAST_MODIFICATION_USER_ID = 2L;

    @Autowired
    private GlobalParameterRepository globalParameterRepository;

    @Autowired
    private GlobalParameterMapper globalParameterMapper;

    @Autowired
    private GlobalParameterService globalParameterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restGlobalParameterMockMvc;

    private GlobalParameter globalParameter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GlobalParameterResource globalParameterResource = new GlobalParameterResource(globalParameterService);
        this.restGlobalParameterMockMvc = MockMvcBuilders.standaloneSetup(globalParameterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GlobalParameter createEntity(EntityManager em) {
        GlobalParameter globalParameter = new GlobalParameter()
            .paramCode(DEFAULT_PARAM_CODE)
            .paramName(DEFAULT_PARAM_NAME)
            .paramType(DEFAULT_PARAM_TYPE)
            .intValue(DEFAULT_INT_VALUE)
            .floatValue(DEFAULT_FLOAT_VALUE)
            .stringValue(DEFAULT_STRING_VALUE)
            .dateValue(DEFAULT_DATE_VALUE)
            .show(DEFAULT_SHOW)
            .edit(DEFAULT_EDIT)
            .createSystemDate(DEFAULT_CREATE_SYSTEM_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .createUserId(DEFAULT_CREATE_USER_ID)
            .lastModificationSystemDate(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(DEFAULT_LAST_MODIFICATION_DATE)
            .lastModificationUserId(DEFAULT_LAST_MODIFICATION_USER_ID);
        return globalParameter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GlobalParameter createUpdatedEntity(EntityManager em) {
        GlobalParameter globalParameter = new GlobalParameter()
            .paramCode(UPDATED_PARAM_CODE)
            .paramName(UPDATED_PARAM_NAME)
            .paramType(UPDATED_PARAM_TYPE)
            .intValue(UPDATED_INT_VALUE)
            .floatValue(UPDATED_FLOAT_VALUE)
            .stringValue(UPDATED_STRING_VALUE)
            .dateValue(UPDATED_DATE_VALUE)
            .show(UPDATED_SHOW)
            .edit(UPDATED_EDIT)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        return globalParameter;
    }

    @BeforeEach
    public void initTest() {
        globalParameter = createEntity(em);
    }

    @Test
    @Transactional
    public void createGlobalParameter() throws Exception {
        int databaseSizeBeforeCreate = globalParameterRepository.findAll().size();

        // Create the GlobalParameter
        GlobalParameterDTO globalParameterDTO = globalParameterMapper.toDto(globalParameter);
        restGlobalParameterMockMvc.perform(post("/api/global-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalParameterDTO)))
            .andExpect(status().isCreated());

        // Validate the GlobalParameter in the database
        List<GlobalParameter> globalParameterList = globalParameterRepository.findAll();
        assertThat(globalParameterList).hasSize(databaseSizeBeforeCreate + 1);
        GlobalParameter testGlobalParameter = globalParameterList.get(globalParameterList.size() - 1);
        assertThat(testGlobalParameter.getParamCode()).isEqualTo(DEFAULT_PARAM_CODE);
        assertThat(testGlobalParameter.getParamName()).isEqualTo(DEFAULT_PARAM_NAME);
        assertThat(testGlobalParameter.getParamType()).isEqualTo(DEFAULT_PARAM_TYPE);
        assertThat(testGlobalParameter.getIntValue()).isEqualTo(DEFAULT_INT_VALUE);
        assertThat(testGlobalParameter.getFloatValue()).isEqualTo(DEFAULT_FLOAT_VALUE);
        assertThat(testGlobalParameter.getStringValue()).isEqualTo(DEFAULT_STRING_VALUE);
        assertThat(testGlobalParameter.getDateValue()).isEqualTo(DEFAULT_DATE_VALUE);
        assertThat(testGlobalParameter.isShow()).isEqualTo(DEFAULT_SHOW);
        assertThat(testGlobalParameter.isEdit()).isEqualTo(DEFAULT_EDIT);
        assertThat(testGlobalParameter.getCreateSystemDate()).isEqualTo(DEFAULT_CREATE_SYSTEM_DATE);
        assertThat(testGlobalParameter.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testGlobalParameter.getCreateUserId()).isEqualTo(DEFAULT_CREATE_USER_ID);
        assertThat(testGlobalParameter.getLastModificationSystemDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testGlobalParameter.getLastModificationDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_DATE);
        assertThat(testGlobalParameter.getLastModificationUserId()).isEqualTo(DEFAULT_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void createGlobalParameterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = globalParameterRepository.findAll().size();

        // Create the GlobalParameter with an existing ID
        globalParameter.setId(1L);
        GlobalParameterDTO globalParameterDTO = globalParameterMapper.toDto(globalParameter);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGlobalParameterMockMvc.perform(post("/api/global-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalParameterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GlobalParameter in the database
        List<GlobalParameter> globalParameterList = globalParameterRepository.findAll();
        assertThat(globalParameterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGlobalParameters() throws Exception {
        // Initialize the database
        globalParameterRepository.saveAndFlush(globalParameter);

        // Get all the globalParameterList
        restGlobalParameterMockMvc.perform(get("/api/global-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(globalParameter.getId().intValue())))
            .andExpect(jsonPath("$.[*].paramCode").value(hasItem(DEFAULT_PARAM_CODE)))
            .andExpect(jsonPath("$.[*].paramName").value(hasItem(DEFAULT_PARAM_NAME)))
            .andExpect(jsonPath("$.[*].paramType").value(hasItem(DEFAULT_PARAM_TYPE)))
            .andExpect(jsonPath("$.[*].intValue").value(hasItem(DEFAULT_INT_VALUE)))
            .andExpect(jsonPath("$.[*].floatValue").value(hasItem(DEFAULT_FLOAT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].stringValue").value(hasItem(DEFAULT_STRING_VALUE)))
            .andExpect(jsonPath("$.[*].dateValue").value(hasItem(DEFAULT_DATE_VALUE.toString())))
            .andExpect(jsonPath("$.[*].show").value(hasItem(DEFAULT_SHOW.booleanValue())))
            .andExpect(jsonPath("$.[*].edit").value(hasItem(DEFAULT_EDIT.booleanValue())))
            .andExpect(jsonPath("$.[*].createSystemDate").value(hasItem(DEFAULT_CREATE_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].createUserId").value(hasItem(DEFAULT_CREATE_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModificationSystemDate").value(hasItem(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFICATION_DATE))))
            .andExpect(jsonPath("$.[*].lastModificationUserId").value(hasItem(DEFAULT_LAST_MODIFICATION_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getGlobalParameter() throws Exception {
        // Initialize the database
        globalParameterRepository.saveAndFlush(globalParameter);

        // Get the globalParameter
        restGlobalParameterMockMvc.perform(get("/api/global-parameters/{id}", globalParameter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(globalParameter.getId().intValue()))
            .andExpect(jsonPath("$.paramCode").value(DEFAULT_PARAM_CODE))
            .andExpect(jsonPath("$.paramName").value(DEFAULT_PARAM_NAME))
            .andExpect(jsonPath("$.paramType").value(DEFAULT_PARAM_TYPE))
            .andExpect(jsonPath("$.intValue").value(DEFAULT_INT_VALUE))
            .andExpect(jsonPath("$.floatValue").value(DEFAULT_FLOAT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.stringValue").value(DEFAULT_STRING_VALUE))
            .andExpect(jsonPath("$.dateValue").value(DEFAULT_DATE_VALUE.toString()))
            .andExpect(jsonPath("$.show").value(DEFAULT_SHOW.booleanValue()))
            .andExpect(jsonPath("$.edit").value(DEFAULT_EDIT.booleanValue()))
            .andExpect(jsonPath("$.createSystemDate").value(DEFAULT_CREATE_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(sameInstant(DEFAULT_CREATE_DATE)))
            .andExpect(jsonPath("$.createUserId").value(DEFAULT_CREATE_USER_ID.intValue()))
            .andExpect(jsonPath("$.lastModificationSystemDate").value(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.lastModificationDate").value(sameInstant(DEFAULT_LAST_MODIFICATION_DATE)))
            .andExpect(jsonPath("$.lastModificationUserId").value(DEFAULT_LAST_MODIFICATION_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGlobalParameter() throws Exception {
        // Get the globalParameter
        restGlobalParameterMockMvc.perform(get("/api/global-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGlobalParameter() throws Exception {
        // Initialize the database
        globalParameterRepository.saveAndFlush(globalParameter);

        int databaseSizeBeforeUpdate = globalParameterRepository.findAll().size();

        // Update the globalParameter
        GlobalParameter updatedGlobalParameter = globalParameterRepository.findById(globalParameter.getId()).get();
        // Disconnect from session so that the updates on updatedGlobalParameter are not directly saved in db
        em.detach(updatedGlobalParameter);
        updatedGlobalParameter
            .paramCode(UPDATED_PARAM_CODE)
            .paramName(UPDATED_PARAM_NAME)
            .paramType(UPDATED_PARAM_TYPE)
            .intValue(UPDATED_INT_VALUE)
            .floatValue(UPDATED_FLOAT_VALUE)
            .stringValue(UPDATED_STRING_VALUE)
            .dateValue(UPDATED_DATE_VALUE)
            .show(UPDATED_SHOW)
            .edit(UPDATED_EDIT)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        GlobalParameterDTO globalParameterDTO = globalParameterMapper.toDto(updatedGlobalParameter);

        restGlobalParameterMockMvc.perform(put("/api/global-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalParameterDTO)))
            .andExpect(status().isOk());

        // Validate the GlobalParameter in the database
        List<GlobalParameter> globalParameterList = globalParameterRepository.findAll();
        assertThat(globalParameterList).hasSize(databaseSizeBeforeUpdate);
        GlobalParameter testGlobalParameter = globalParameterList.get(globalParameterList.size() - 1);
        assertThat(testGlobalParameter.getParamCode()).isEqualTo(UPDATED_PARAM_CODE);
        assertThat(testGlobalParameter.getParamName()).isEqualTo(UPDATED_PARAM_NAME);
        assertThat(testGlobalParameter.getParamType()).isEqualTo(UPDATED_PARAM_TYPE);
        assertThat(testGlobalParameter.getIntValue()).isEqualTo(UPDATED_INT_VALUE);
        assertThat(testGlobalParameter.getFloatValue()).isEqualTo(UPDATED_FLOAT_VALUE);
        assertThat(testGlobalParameter.getStringValue()).isEqualTo(UPDATED_STRING_VALUE);
        assertThat(testGlobalParameter.getDateValue()).isEqualTo(UPDATED_DATE_VALUE);
        assertThat(testGlobalParameter.isShow()).isEqualTo(UPDATED_SHOW);
        assertThat(testGlobalParameter.isEdit()).isEqualTo(UPDATED_EDIT);
        assertThat(testGlobalParameter.getCreateSystemDate()).isEqualTo(UPDATED_CREATE_SYSTEM_DATE);
        assertThat(testGlobalParameter.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testGlobalParameter.getCreateUserId()).isEqualTo(UPDATED_CREATE_USER_ID);
        assertThat(testGlobalParameter.getLastModificationSystemDate()).isEqualTo(UPDATED_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testGlobalParameter.getLastModificationDate()).isEqualTo(UPDATED_LAST_MODIFICATION_DATE);
        assertThat(testGlobalParameter.getLastModificationUserId()).isEqualTo(UPDATED_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingGlobalParameter() throws Exception {
        int databaseSizeBeforeUpdate = globalParameterRepository.findAll().size();

        // Create the GlobalParameter
        GlobalParameterDTO globalParameterDTO = globalParameterMapper.toDto(globalParameter);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGlobalParameterMockMvc.perform(put("/api/global-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalParameterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GlobalParameter in the database
        List<GlobalParameter> globalParameterList = globalParameterRepository.findAll();
        assertThat(globalParameterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGlobalParameter() throws Exception {
        // Initialize the database
        globalParameterRepository.saveAndFlush(globalParameter);

        int databaseSizeBeforeDelete = globalParameterRepository.findAll().size();

        // Delete the globalParameter
        restGlobalParameterMockMvc.perform(delete("/api/global-parameters/{id}", globalParameter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GlobalParameter> globalParameterList = globalParameterRepository.findAll();
        assertThat(globalParameterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GlobalParameter.class);
        GlobalParameter globalParameter1 = new GlobalParameter();
        globalParameter1.setId(1L);
        GlobalParameter globalParameter2 = new GlobalParameter();
        globalParameter2.setId(globalParameter1.getId());
        assertThat(globalParameter1).isEqualTo(globalParameter2);
        globalParameter2.setId(2L);
        assertThat(globalParameter1).isNotEqualTo(globalParameter2);
        globalParameter1.setId(null);
        assertThat(globalParameter1).isNotEqualTo(globalParameter2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GlobalParameterDTO.class);
        GlobalParameterDTO globalParameterDTO1 = new GlobalParameterDTO();
        globalParameterDTO1.setId(1L);
        GlobalParameterDTO globalParameterDTO2 = new GlobalParameterDTO();
        assertThat(globalParameterDTO1).isNotEqualTo(globalParameterDTO2);
        globalParameterDTO2.setId(globalParameterDTO1.getId());
        assertThat(globalParameterDTO1).isEqualTo(globalParameterDTO2);
        globalParameterDTO2.setId(2L);
        assertThat(globalParameterDTO1).isNotEqualTo(globalParameterDTO2);
        globalParameterDTO1.setId(null);
        assertThat(globalParameterDTO1).isNotEqualTo(globalParameterDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(globalParameterMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(globalParameterMapper.fromId(null)).isNull();
    }
}
