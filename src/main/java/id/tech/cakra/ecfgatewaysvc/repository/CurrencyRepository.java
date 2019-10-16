package id.tech.cakra.ecfgatewaysvc.repository;
import id.tech.cakra.ecfgatewaysvc.domain.Currency;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Currency entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {

}
