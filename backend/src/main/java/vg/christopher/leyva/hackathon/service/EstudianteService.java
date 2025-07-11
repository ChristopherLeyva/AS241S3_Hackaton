package vg.christopher.leyva.hackathon.service;

import vg.christopher.leyva.hackathon.model.Estudiante;

import java.util.List;
import java.util.Optional;

public interface EstudianteService {

    List<Estudiante> findAll();

    Optional<Estudiante> findById(Integer id);

    Estudiante save(Estudiante estudiante);

    Estudiante update(Estudiante estudiante);

    void delete(Integer id);

    void deletePermanente(Integer id);

    void restore(Integer id);

    List<Estudiante> findByEstado(String estado);

    byte[] generateJasperPdfReport() throws Exception;
}
