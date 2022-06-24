package testboard.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    @Query(value="select * from board where cno = :cno and title like %:keyword%",nativeQuery = true)
    Page<BoardEntity> findBytitle (@Param("cno")int cno, @Param("keyword")String keyword, Pageable pageable);
    @Query(value="select * from board where cno = :cno and content like %:keyword%",nativeQuery = true)
    Page<BoardEntity> findBycontent (@Param("cno")int cno, @Param("keyword")String keyword, Pageable pageable);
    @Query(value="select * from board where title like %:keyword%",nativeQuery = true)
    Page<BoardEntity> findBytitlenocno (@Param("keyword")String keyword, Pageable pageable);
    @Query(value="select * from board where content like %:keyword%",nativeQuery = true)
    Page<BoardEntity> findBycontentnocno (@Param("keyword")String keyword, Pageable pageable);

}