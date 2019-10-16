package id.tech.cakra.ecfgatewaysvc.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A GlobalParameter.
 */
@Entity
@Table(name = "global_parameter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GlobalParameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 10)
    @Column(name = "param_code", length = 10)
    private String paramCode;

    @Size(max = 100)
    @Column(name = "param_name", length = 100)
    private String paramName;

    @Size(max = 1)
    @Column(name = "param_type", length = 1)
    private String paramType;

    @Column(name = "int_value")
    private Integer intValue;

    @Column(name = "float_value")
    private Float floatValue;

    @Size(max = 100)
    @Column(name = "string_value", length = 100)
    private String stringValue;

    @Column(name = "date_value")
    private LocalDate dateValue;

    @Column(name = "show")
    private Boolean show;

    @Column(name = "edit")
    private Boolean edit;

    @Column(name = "create_system_date")
    private LocalDate createSystemDate;

    @Column(name = "create_date")
    private ZonedDateTime createDate;

    @Column(name = "create_user_id")
    private Long createUserId;

    @Column(name = "last_modification_system_date")
    private LocalDate lastModificationSystemDate;

    @Column(name = "last_modification_date")
    private ZonedDateTime lastModificationDate;

    @Column(name = "last_modification_user_id")
    private Long lastModificationUserId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParamCode() {
        return paramCode;
    }

    public GlobalParameter paramCode(String paramCode) {
        this.paramCode = paramCode;
        return this;
    }

    public void setParamCode(String paramCode) {
        this.paramCode = paramCode;
    }

    public String getParamName() {
        return paramName;
    }

    public GlobalParameter paramName(String paramName) {
        this.paramName = paramName;
        return this;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getParamType() {
        return paramType;
    }

    public GlobalParameter paramType(String paramType) {
        this.paramType = paramType;
        return this;
    }

    public void setParamType(String paramType) {
        this.paramType = paramType;
    }

    public Integer getIntValue() {
        return intValue;
    }

    public GlobalParameter intValue(Integer intValue) {
        this.intValue = intValue;
        return this;
    }

    public void setIntValue(Integer intValue) {
        this.intValue = intValue;
    }

    public Float getFloatValue() {
        return floatValue;
    }

    public GlobalParameter floatValue(Float floatValue) {
        this.floatValue = floatValue;
        return this;
    }

    public void setFloatValue(Float floatValue) {
        this.floatValue = floatValue;
    }

    public String getStringValue() {
        return stringValue;
    }

    public GlobalParameter stringValue(String stringValue) {
        this.stringValue = stringValue;
        return this;
    }

    public void setStringValue(String stringValue) {
        this.stringValue = stringValue;
    }

    public LocalDate getDateValue() {
        return dateValue;
    }

    public GlobalParameter dateValue(LocalDate dateValue) {
        this.dateValue = dateValue;
        return this;
    }

    public void setDateValue(LocalDate dateValue) {
        this.dateValue = dateValue;
    }

    public Boolean isShow() {
        return show;
    }

    public GlobalParameter show(Boolean show) {
        this.show = show;
        return this;
    }

    public void setShow(Boolean show) {
        this.show = show;
    }

    public Boolean isEdit() {
        return edit;
    }

    public GlobalParameter edit(Boolean edit) {
        this.edit = edit;
        return this;
    }

    public void setEdit(Boolean edit) {
        this.edit = edit;
    }

    public LocalDate getCreateSystemDate() {
        return createSystemDate;
    }

    public GlobalParameter createSystemDate(LocalDate createSystemDate) {
        this.createSystemDate = createSystemDate;
        return this;
    }

    public void setCreateSystemDate(LocalDate createSystemDate) {
        this.createSystemDate = createSystemDate;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public GlobalParameter createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public Long getCreateUserId() {
        return createUserId;
    }

    public GlobalParameter createUserId(Long createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public void setCreateUserId(Long createUserId) {
        this.createUserId = createUserId;
    }

    public LocalDate getLastModificationSystemDate() {
        return lastModificationSystemDate;
    }

    public GlobalParameter lastModificationSystemDate(LocalDate lastModificationSystemDate) {
        this.lastModificationSystemDate = lastModificationSystemDate;
        return this;
    }

    public void setLastModificationSystemDate(LocalDate lastModificationSystemDate) {
        this.lastModificationSystemDate = lastModificationSystemDate;
    }

    public ZonedDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public GlobalParameter lastModificationDate(ZonedDateTime lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
        return this;
    }

    public void setLastModificationDate(ZonedDateTime lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
    }

    public Long getLastModificationUserId() {
        return lastModificationUserId;
    }

    public GlobalParameter lastModificationUserId(Long lastModificationUserId) {
        this.lastModificationUserId = lastModificationUserId;
        return this;
    }

    public void setLastModificationUserId(Long lastModificationUserId) {
        this.lastModificationUserId = lastModificationUserId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GlobalParameter)) {
            return false;
        }
        return id != null && id.equals(((GlobalParameter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GlobalParameter{" +
            "id=" + getId() +
            ", paramCode='" + getParamCode() + "'" +
            ", paramName='" + getParamName() + "'" +
            ", paramType='" + getParamType() + "'" +
            ", intValue=" + getIntValue() +
            ", floatValue=" + getFloatValue() +
            ", stringValue='" + getStringValue() + "'" +
            ", dateValue='" + getDateValue() + "'" +
            ", show='" + isShow() + "'" +
            ", edit='" + isEdit() + "'" +
            ", createSystemDate='" + getCreateSystemDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", createUserId=" + getCreateUserId() +
            ", lastModificationSystemDate='" + getLastModificationSystemDate() + "'" +
            ", lastModificationDate='" + getLastModificationDate() + "'" +
            ", lastModificationUserId=" + getLastModificationUserId() +
            "}";
    }
}
