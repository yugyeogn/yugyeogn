<?php
if (isset($_FILES['photo'])) {
    $file = $_FILES['photo'];

    // 업로드된 파일 정보
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    // 파일 확장자 확인
    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
    $allowedExtensions = array("jpg", "jpeg", "png", "gif");

    if (in_array($fileExt, $allowedExtensions)) {
        if ($fileError === 0) {
            // 파일을 원하는 디렉토리로 이동
            $newFileName = uniqid('', true) . "." . $fileExt;
            $uploadPath = "uploads/" . $newFileName;
            move_uploaded_file($fileTmpName, $uploadPath);

            // 데이터베이스 업데이트
            $db = new PDO('sqlite:photos.db');
            $stmt = $db->prepare("INSERT INTO photos (filename) VALUES (?)");
            $stmt->execute(array($newFileName));

            header("Location: index.html"); // 업로드 후 홈페이지로 이동
        } else {
            echo "파일 업로드 중 오류가 발생했습니다.";
        }
    } else {
        echo "지원하지 않는 파일 형식입니다.";
    }
}
?>
