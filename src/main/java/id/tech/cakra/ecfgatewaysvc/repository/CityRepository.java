package id.tech.cakra.ecfgatewaysvc.repository;
import id.tech.cakra.ecfgatewaysvc.domain.City;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City, Long> {

}