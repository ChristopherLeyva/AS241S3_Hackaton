package vg.christopher.leyva.hackathon.repository;

import vg.christopher.leyva.hackathon.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    // Buscar por DNI (único)
    Optional<Estudiante> findByDni(String dni);

    // Buscar por estado
    List<Estudiante> findAllByEstado(String estado);

    // Buscar por programa técnico
    List<Estudiante> findByProgramaContainingIgnoreCase(String programa);

    // Filtros combinados (programa + estado)
    List<Estudiante> findByProgramaAndEstado(String programa, String estado);

    // Filtro por año de ingreso
    List<Estudiante> findByAnioIngreso(Integer anioIngreso);

    // Filtro por ubicación anidada
    List<Estudiante> findByUbicacionDepartamentoAndUbicacionProvinciaAndUbicacionDistrito(
        String departamento,
        String provincia,
        String distrito
    );
}
