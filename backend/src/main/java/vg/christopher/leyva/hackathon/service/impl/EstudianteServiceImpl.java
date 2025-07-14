package vg.christopher.leyva.hackathon.service.impl;

import lombok.extern.slf4j.Slf4j;
import vg.christopher.leyva.hackathon.model.Estudiante;
import vg.christopher.leyva.hackathon.repository.EstudianteRepository;
import vg.christopher.leyva.hackathon.service.EstudianteService;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperExportManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EstudianteServiceImpl implements EstudianteService {

    private final EstudianteRepository estudianteRepository;

    @Autowired
    private DataSource dataSource;

    @Autowired
    public EstudianteServiceImpl(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    @Override
    public List<Estudiante> findAll() {
        log.info("Listando todos los estudiantes");
        return estudianteRepository.findAll();
    }

    @Override
    public Optional<Estudiante> findById(Integer id) {
        log.info("Buscando estudiante por ID: {}", id);
        return estudianteRepository.findById(id);
    }

    @Override
    public Estudiante save(Estudiante estudiante) {
        log.info("Guardando estudiante: {}", estudiante);
        estudiante.setEstado(Estudiante.ESTADO_ACTIVO);
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante update(Estudiante estudiante) {
        log.info("Actualizando estudiante: {}", estudiante);
        return estudianteRepository.save(estudiante);
    }

    @Override
    public void delete(Integer id) {
        estudianteRepository.findById(id).ifPresent(est -> {
            est.setEstado(Estudiante.ESTADO_INACTIVO);
            estudianteRepository.save(est);
            log.info("Estudiante eliminado lógicamente: {}", id);
        });
    }

    @Override
    public void deletePermanente(Integer id) {
        if (estudianteRepository.existsById(id)) {
            estudianteRepository.deleteById(id);
            log.info("Estudiante eliminado permanentemente: {}", id);
        } else {
            log.warn("Estudiante no encontrado para eliminación permanente: {}", id);
        }
    }

    @Override
    public void restore(Integer id) {
        estudianteRepository.findById(id).ifPresent(est -> {
            est.setEstado(Estudiante.ESTADO_ACTIVO);
            estudianteRepository.save(est);
            log.info("Estudiante restaurado con ID: {}", id);
        });
    }

    @Override
    public List<Estudiante> findByEstado(String estado) {
        log.info("Buscando estudiantes por estado: {}", estado);
        return estudianteRepository.findAllByEstado(estado);
    }

@Override
public byte[] generateJasperPdfReport() throws Exception {
// Cargar archivo .jasper en src/main/resources/reports (SIN USAR IMÁGENES EN
EL JASPER)
InputStream jasperStream = new
ClassPathResource("reports/student.report.jasper").getInputStream();
// Sin parámetros
HashMap<String, Object> params = new HashMap<>();
// Llenar reporte con conexión a Oracle Cloud con application.yml |
aplicación.properties
JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params,
dataSource.getConnection());
// Exportar a PDF
return JasperExportManager.exportReportToPdf(jasperPrint);
}

}
