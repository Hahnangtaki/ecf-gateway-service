package id.tech.cakra.ecfgatewaysvc.repository;
import id.tech.cakra.ecfgatewaysvc.domain.CompanyBank;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyBank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyBankRepository extends JpaRepository<CompanyBank, Long> {

}
