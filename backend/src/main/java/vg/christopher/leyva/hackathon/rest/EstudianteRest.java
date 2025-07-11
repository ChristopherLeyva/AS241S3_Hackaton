package vg.christopher.leyva.hackathon.rest;

import vg.christopher.leyva.hackathon.model.Estudiante;
import vg.christopher.leyva.hackathon.service.EstudianteService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/estudiante")
public class EstudianteRest {

    private final EstudianteService estudianteService;

    public EstudianteRest(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public List<Estudiante> findAll() {
        return estudianteService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Estudiante> findById(@PathVariable Integer id) {
        return estudianteService.findById(id);
    }

    @PostMapping("/save")
    public Estudiante save(@RequestBody Estudiante estudiante) {
        return estudianteService.save(estudiante);
    }

    @PutMapping("/update")
    public Estudiante update(@RequestBody Estudiante estudiante) {
        return estudianteService.update(estudiante);
    }

    @DeleteMapping("/delete-logico/{id}")
    public String delete(@PathVariable Integer id) {
        estudianteService.delete(id);
        return "Estudiante eliminado lógicamente con ID: " + id;
    }

    @DeleteMapping("/delete-fisico/{id}")
    public String deletePermanente(@PathVariable Integer id) {
        estudianteService.deletePermanente(id);
        return "Estudiante eliminado permanentemente con ID: " + id;
    }

    @PutMapping("/restore/{id}")
    public String restore(@PathVariable Integer id) {
        estudianteService.restore(id);
        return "Estudiante restaurado con ID: " + id;
    }

    @GetMapping("/estado/{estado}")
    public List<Estudiante> findByEstado(@PathVariable String estado) {
        return estudianteService.findByEstado(estado);
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> generateJasperPdfReport() {
        try {
            byte[] pdf = estudianteService.generateJasperPdfReport();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"reporte_Estudiantes.pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
