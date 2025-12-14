-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: database-1.clieg46wkhrm.ap-southeast-1.rds.amazonaws.com    Database: batdongsan
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `area_m2` decimal(10,2) NOT NULL,
  `price_per_m2` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `coord_x` decimal(20,15) NOT NULL,
  `coord_y` decimal(20,15) NOT NULL,
  `bedrooms` int DEFAULT NULL,
  `floors` int DEFAULT NULL,
  `frontage` decimal(10,2) DEFAULT NULL,
  `legal_status` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `district_id` bigint NOT NULL,
  `property_type_id` bigint NOT NULL,
  `province_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `views` int NOT NULL,
  `tab` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `properties_property_district_id_7cbcdbdb_fk_defaults_district_id` (`district_id`),
  KEY `properties_property_property_type_id_21d12070_fk_defaults_` (`property_type_id`),
  KEY `properties_property_province_id_ab18575e_fk_defaults_province_id` (`province_id`),
  KEY `Property_user_id_bdf85459_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `properties_property_district_id_7cbcdbdb_fk_defaults_district_id` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`),
  CONSTRAINT `properties_property_property_type_id_21d12070_fk_defaults_` FOREIGN KEY (`property_type_id`) REFERENCES `propertytype` (`id`),
  CONSTRAINT `properties_property_province_id_ab18575e_fk_defaults_province_id` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`),
  CONSTRAINT `Property_user_id_bdf85459_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (18,'Cập nhật liên tục rổ hàng bán tháng 08/2025 1PN+ 1 65m2 giá 2.6 tỷ, 2PN 73m2 giá 3.150 tỷ sổ sẵn','Rổ hàng 08/2025 mới nhất, đang bán giá tốt nhất thị trường, cạnh tranh - 0976 312 ***, căn có thật ko chào ảo.\r\n\r\n- 1PN + 1 DT 63m² tới 65m² gía 2.6 tỷ View ngoài và view trực diện hồ bơi, sổ sẵn, mua bán sang tên ngay.\r\n- 2PN + 2Wc 70m² giá 3.1 tỷ có 3 căn sẵn xem nhà, sổ sẵn chủ ko vay muốn bán sớm.\r\n- 2PN, 2WC 73m² giá 3.150 tỷ tới 3.2 tỷ sẵn căn xem nhà ngay, sổ sẵn.\r\n- 3PN 100m² view hồ bơi giá 4 tỷ. Còn nhiều căn khác nhau có thể lựa chọn, làm việc chính chủ.\r\n\r\n- Tiện ích có sẵn: Hồ bơi người lớn, trẻ em, gym, nhà trẻ, siêu thị, công viên ven sông, BBQ, Sân thê thao đa năng.. Liền kề bờ sông thoáng mát.\r\n- Gần chợ truyền thống, siệu thị đã về, hệ thống trường học từ mẫu giao tới cấp 3 chr cách 1km.\r\n\r\nVị trí: Nằm Cách Nguyễn Duy Trinh 300m, Về trung tâm Q2 chủ 10 phút, Q7 20 phút, trung tâm Q1 25 phút dễ dàng di chuyển đi các quận huyện trong TP.\r\nLH: 097631269 Ms Duyên ở tại dự án, chuyên bán dự án, xem nhà bất kể khi nào.',2600.00,65.00,40.00,'Dự án MT Eastmark City, Đường Trường Lưu, Phường Long Trường, Quận 9, Hồ Chí Minh',106.823440000000000,10.797104000000000,2,NULL,NULL,1,'2025-08-21 03:21:04.108993','2025-12-05 05:47:06.113673',1,21,1,1,18,'properties/property/ad88a4e09ab14565ba25660786e10fb5.webp1763374032_050034',NULL,152,'ban','approved'),(19,'Chuyên cho thuê căn hộ Vinhomes Central Park giá chỉ từ: 1PN 16tr - 2PN 18tr - 3PN 29tr - 4PN 50tr','600 + căn hộ cho thuê Vinhomes giá tốt chỉ từ 15 triệu/th.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***\r\n----------------------------------------------------\r\n* Căn hộ 1 phòng ngủ có diện tích: 36; 50,5m² - 56m²:\r\n- Giá thuê nội thất cơ bản: 14 - 16 triệu VNĐ/tháng.\r\n- Giá thuê đầy đủ nội thất: 15 - 18 triệu VNĐ/tháng.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***\r\n\r\n* Căn hộ 2 phòng ngủ có diện tích: 68,5 - 89 - 90,6m²:\r\n- Giá thuê nội thất cơ bản: 16 - 21 triệu VNĐ/tháng.\r\n- Giá thuê đầy đủ nội thất: 18 - 25 triệu VNĐ/tháng.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***\r\n\r\n* Căn hộ 3 phòng ngủ có diện tích: 94m - 118m - 140m.\r\n- Giá thuê nội thất cơ bản: 23 - 26 triệu VNĐ/tháng.\r\n- Giá thuê đầy đủ nội thất: 25 - 35 triệu VNĐ/tháng.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***\r\n\r\n* Căn hộ 4 phòng ngủ có diện tích: 145 - 160 - 188m:\r\n- Giá thuê nội thất cơ bản: 35 - 37 - 45 triệu VNĐ/tháng.\r\n- Giá thuê đầy đủ nội thất: 45; 55 - 65 - 75 triệu VNĐ/tháng. H.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***\r\n----------------------------------------------------\r\nNgoài ra còn cho thuê căn hộ theo ngày, theo tuần, theo tháng.\r\n* Hỗ trợ anh chị nhiệt tình đến khi chọn được căn ưng ý mà không phát sinh thêm chi phí.\r\nThủ tục pháp lý rõ ràng, có uy tín trách nhiệm cao.\r\nTiện ích dành xriêng cho cư dân và khách thuê căn hộ Vinhomes Central Park.\r\n- Hầm giữ xe.\r\n- Hồ bơi ngoài trời, nhiều mảng xanh.\r\n- Mặt bằng thương mại dưới các tòa căn hộ Vinhomes.\r\n- Công viên ven sông Sài Gòn, bến du thuyền đẳng cấp.\r\n- Phòng tập gym.\r\n- Sảnh lounge sang trọng chuẩn 5 sao.\r\n- Hệ thống sân tập thể thao.\r\n- Hệ thống trường Vinschool và bệnh viện Vinmec.\r\n- An ninh tuyệt đối, camera 24/7.\r\nTư vấn miễn phí gọi ngay: 0909 638 ***',18.00,90.00,0.20,'Dự án Vinhomes Central Park, Đường Điện Biên Phủ, Phường 22, Bình Thạnh, Hồ Chí Minh',106.721878051757830,10.795545175110025,-2,0,0.00,2,'2025-11-13 18:10:02.875839','2025-12-05 05:40:11.132364',1,3,1,1,15,'properties/property/c0587260e1a7472eb53ccf80fbead35e.jpg1763057402_87108',NULL,19,'thue','approved'),(20,'Giá sốc tháng 11 căn hộ Vinhomes Grand Park, Quận 9 - Studio, 1 phòng ngủ, 2 phòng ngủ, 3 phòng ngủ','Studio chỉ từ 4.5 triệu 1 phòng ngủ từ 5 triệu 2 phòng ngủ từ 6 triệu 3 phòng ngủ chỉ 8.5 triệu/tháng.\r\n\r\nĐịa chỉ: Dự án Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP. Thủ Đức (Quận 9 cũ).\r\nDịch vụ cho thuê chuyên nghiệp uy tín tận tâm.\r\nTDH Homes hân hạnh mang đến giỏ hàng đa dạng, giá tốt nhất thị trường. Hỗ trợ tư vấn và xem nhà 24/7 hoàn toàn miễn phí.\r\n\r\nCác loại căn hộ hiện có.\r\n1. Căn Studio.\r\n- Trống: 4.500.000đ/tháng.\r\n- Có bếp + rèm: 5.000.000đ đến 5.500.000đ/tháng.\r\n- Full nội thất: 5.500.000đ đến 6.500.000đ/tháng.\r\nHiện có căn full nội thất view Vincom Mega Mall, giá rất tốt. Liên hệ ngay 0839 221 *** để xem thực tế.',4.50,32.00,0.14,'Dự án Vinhomes Grand Park, Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh',106.829752000000000,10.827991000000000,1,0,0.00,2,'2025-11-13 18:30:10.366786','2025-12-05 13:21:16.579941',1,21,1,1,15,'properties/property/3b05a03dcb9646b29e3660b4ed8eacab.jpg1763058610_345764',NULL,61,'ban','approved'),(31,'Chuyển nhượng gấp quỹ căn hộ giá tốt nhất thị trường Vinhomes Ocean Park 1','Chuyển nhượng gấp căn hộ giá tốt nhất thị trường - làm việc chính chủ - pháp lý rõ ràng - hỗ trợ vay bank 80%.\r\n\r\nDo không có nhu cầu sử dụng, chủ nhà cần bán gấp một số căn hộ mới, chưa qua sử dụng với giá cực tốt. Ưu tiên khách mua ở thực hoặc nhà đầu tư cho thuê!\r\n\r\nLiên hệ trực tiếp: Mr. Hà Thanh Đức 0368 281 *** (Hỗ trợ xem nhà 24/7).\r\n\r\nThông tin các căn chuyển nhượng (giá cập nhật liên tục):\r\nStudio.\r\n25m², 36m² giá từ 2.3 tỷ.\r\n\r\n1 Phòng ngủ.\r\n43m² (1PN + 1VS) 3 tỷ.\r\n48m² (1PN + 1VS) 3.3 tỷ.\r\n\r\n2 Phòng ngủ.\r\n59m² (2PN + 1VS) Giá từ 3.5 tỷ.\r\n67m² (2PN + 2VS, căn giữa) 4 tỷ.\r\n69m² 70m² (2PN + 2VS, căn góc) 4.2 tỷ.\r\n\r\n3 Phòng ngủ.\r\n80m² (3PN + 2VS) 4.9 tỷ.\r\n100m² (3PN + 2VS) 6 tỷ.\r\n106m² (3PN + 2VS) 6.3 tỷ.\r\n\r\nƯu đãi và cam kết:\r\n- Làm việc trực tiếp chính chủ.\r\n- Miễn 100% phí môi giới.\r\n- Giá rẻ nhất thị trường không qua trung gian.\r\n- Hỗ trợ xem nhà 24/7.\r\n- Ưu đãi đặc biệt cho khách đặt cọc sớm.\r\n- Thủ tục nhanh gọn, sang tên sổ đỏ rõ ràng.\r\n\r\nQuý khách quan tâm xin vui lòng liên hệ sớm để được tư vấn chi tiết và hỗ trợ đi xem nhà trực tiếp:\r\n\r\n* Mr. Hà Thanh Đức 0834 998 ***.\r\nHỗ trợ 24/7 Uy tín - Trách nhiệm - Chuyên nghiệp.',3500.00,59.00,59.32,'Dự án Vinhomes Ocean Park Gia Lâm, Xã Dương Xá, Gia Lâm, Hà Nội',105.966130000000000,21.002872000000000,2,0,0.00,1,'2025-11-18 18:33:32.535274','2025-12-06 02:10:54.038261',1,33,1,5,18,'properties/property/1496fedb4a5d4aed8115ef36ada27210.jpg1763490812_531974',NULL,17,'ban','approved'),(32,'Bán lô góc BT Nam Cường 236m2 rẻ nhất thị trường, đường lớn giá rẻ nhỉnh 40 tỷ LH: 0936 386 ***','Do cần tiền kinh doanh, chính chủ cần bán nhanh căn biệt thự góc 236m² giá tốt nhất biệt thự Nam Cường.\n- Nhà xây 4 tầng, cách công viên Thiên Văn Học và Aeon Mall 500m, ngay giáp trục Lê Quang Đạo...\n- Đường rộng 25m.\n- Giá bán 180 triệu/m² cho anh chị thiện chí. 42,x tỷ\n- Sổ đỏ lâu dài sẵn giai dịch.\nAnh chị quan tâm xem nhà liên hệ: 0936 386 ***.',42300.00,235.00,180.00,'Dự án An Quý Villa - KĐT Dương Nội, Phường Dương Nội, Hà Đông, Hà Nội',105.746155000000000,20.978334000000000,NULL,NULL,NULL,1,'2025-11-18 18:39:06.820400','2025-12-05 13:27:30.060057',1,34,4,5,23,'properties/property/94920702e8d543f2ac409d9a5e171036.jpg1763491146_818839',NULL,47,'ban','approved'),(36,'Bán biệt thự đảo 2 mặt tiền view sông Vinh Heritage, Lê Mao, Tp Vinh','Bán biệt thự đảo 2 mặt tiền view sông Vinh Heritage, Lê Mao, Tp Vinh.\r\n\r\nBiệt thự đảo đơn lập phân khu Ruby kiến trúc Tân cổ điển sang trọng, nằm ngay trục đường Lê Mao kéo dài, phường Trường Vinh, TP Vinh, Nghệ An.\r\nKhu dân cư đẳng cấp đầy đủ tiện ích xung quanh.\r\nVị trí đắc địa trung tâm mới của thành phố, chỉ 5 phút tới công viên & quảng trường trung tâm TP. Vinh.\r\n\r\nThông tin chi tiết:\r\nDiện tích đất: 477,5m² (ngang 22m).\r\nDiện tích sử dụng: 477,5m².\r\nKết cấu: 3 tầng biệt thự đơn lập, thiết kế Tân cổ điển.\r\nĐường: 2 mặt tiền đường rộng 12m & 13m.\r\nHướng: Đông Nam 2 mặt tiền thoáng, view sông cực đẹp.\r\nPháp lý: Sổ đỏ sang tên ngay.\r\n\r\nKhông gian sống đẳng cấp, riêng tư, lý tưởng để an cư hoặc đầu tư nghỉ dưỡng lâu dài.',32000.00,477.50,67.02,'Dự án Vinh Heritage, Đường Lê Mao, Phường Vinh Tân, Vinh, Nghệ An',105.681120872759510,18.664550524056775,NULL,NULL,NULL,1,'2025-12-03 10:27:05.540084','2025-12-05 10:50:16.197163',1,453,4,42,22,'properties/property/0fa3d93b83bb4ebb8135b122c0496c5b.jpg1764757625_536167',NULL,12,'ban','approved'),(37,'Cho Thuê 2PN 1PK 2WC Rộng 70m2 Đầy Đủ Nội Thất Ngay Công Viên Thỏ Trắng, An Ninh Mới 100%','2PN 1PK ĐẦY ĐỦ TIỆN NGHI MẶT TIỀN ĐƯỜNG LỚN GẦN CV THỎ TRẮNG\r\n\r\nAn ninh tuyệt đối, ra vào vân tay\r\n\r\nKhông chugg chủ, giờ giấc tự do\r\n\r\nFull nội thất đầy đủ mới 100%',14.00,70.00,0.20,'Đường Hồ Bá Kiện, Phường 15, Quận 10, Hồ Chí Minh',106.667204000000000,10.782445000000000,NULL,NULL,NULL,1,'2025-12-03 12:07:31.522972','2025-12-05 11:11:50.400293',1,11,3,1,22,'properties/property/91069e942d554ab6a89310b9d5ea8c3f.jpg1764763651_522357',NULL,19,'thue','approved'),(38,'MT EASTMARK Q9, GIÁ F0 MUA TRỰC TIẾP CĐT - TT15%~360TR Nhận Nhà, 0% GỐC LÃI 18 THÁNG','MT Eastmark City - nhà sẵn mua ở - cho thuê ngay, sổ riêng từng căn, giá F0 mua trực tiếp CĐT.\r\nĐợt mở bán cuối 2025 602 căn duy nhất:\r\n- Shophouse: 40 căn.\r\n- Officetel: 60 căn.\r\n- Căn hộ: 502 căn.\r\n- Hotline tư vấn 24/7: 0942 683 *** để xem nhà & chọn căn đẹp nhất!\r\n\r\n(*) Giá F0 - Trực Tiếp Từ Chủ Đầu Tư T12/2025 (dự kiến):\r\n- Officetel (50 - 73m²): Giá chỉ từ 2.5 Tỷ. (Sở hữu lâu dài như nhà ở)\r\n- 1PN & 1PN+ (63 - 65m²): Giá chỉ từ 3.1 Tỷ.\r\n- 2PN (70 - 73m²): Giá chỉ từ 3.6 Tỷ.\r\n- 3PN Doukey: (98m²-99m²): Giá chỉ từ 4.6 Tỷ.\r\n\r\n(*) Ưu đãi T11/2025 từ chủ đầu tư Gamda Land:\r\n- Thanh toán 15% ~ 360Triệu, Nhận nhà ở ngay.\r\n- Cho Vay 80 - 90% (đã có sổ) - Hỗ trợ Miễn phí gốc lãi 18 Tháng.\r\n- Hỗ trợ vay ưu đãi dưới 35 tuổi (LS ưu đãi 6.7% cố định trong 3 năm).\r\n- Tặng ưu đãi 1% khi có booking sớm, tổng mức chiết khấu lên tới 7% (chi tiết sẽ công bố vào ngày mở bán dự kiến 15/12/2025).\r\n- Booking (có hoàn lại): 50 triệu/SP, tối đa 03 booking/khách hàng.\r\n\r\n(*) Tại MT Eastmark City, Anh chị không cần chờ đợi, không bỏ lỡ thời điểm vàng vì các căn hộ đã sẵn sàng bàn giao và gia tăng giá trị sinh lời ngay. Chỉ có ở MT Eastmark City:\r\n\r\n- Nhà đẹp có sẵn, full tiện ích, sổ hồng trao tay ngay.\r\n- 3 mặt tiền đường Trường Lưu, Lò Lu và Vành đai 3, có đường dẫn riêng lên xuống Vành đai 3.\r\n- 5 phút tới ga Metro, 10 phút tới khu công nghệ cao 1, 2 và CNC Samsung.\r\n- 20 phút tới Q1 và TP Biên Hòa.\r\n- 30 phút tới SBQT Long Thành, nơi sẽ có 40.000 chuyên gia, kỹ sư và lao động chất lượng cao.\r\n- Loại hình sản phẩm: 1PN + , 2PN, 3PN và Duplex.\r\n- Giá tuyệt chủng: Chỉ từ 50 triệu/m² (giá khu vực đang ở mức 75 - 100 triệu/m²).\r\n- Đa dạng PTTT, hỗ trợ vay bank 70 - 100% GTHĐ.\r\n\r\nĐầu tư sinh lời ngay Nắm bắt lợi thế giá hiếm giữa thị trường tăng nhiệt.\r\n(*) MT Eastmark - Giá tốt hiếm có, ở ngay, dễ bán, dễ cho thuê.\r\n- Hotline tư vấn 24/7: 0942 683 *** để xem nhà & chọn căn đẹp nhất!',2500.00,50.00,50.00,'Chung cư MT Eastmark City, Trường Lưu, Long Trường, Quận 9, Hồ Chí Minh',106.814300000000000,10.803522000000000,NULL,NULL,NULL,1,'2025-12-05 13:00:05.846884','2025-12-05 13:09:18.876867',1,21,1,1,18,'properties/property/ca58e64d092543c3b41f0ea8c8a5b534.jpg1764939605_846011',NULL,2,'ban','approved'),(39,'Ban Q. Lý Vinhomes SmartCity cập nhật quỹ căn: Studio 2tỷ; 1N + 3tỷ; 2N 4tỷ; 2N + 1 4,5tỷ; 3N 5 tỷ','2PN 1PK ĐẦY ĐỦ TIỆN NGHI MẶT TIỀN ĐƯỜNG LỚN GẦN CV THỎ TRẮNG\r\n\r\nAn ninh tuyệt đối, ra vào vân tay\r\n\r\nKhông chugg chủ, giờ giấc tự do\r\n\r\nFull nội thất đầy đủ mới 100%',4500.00,62.00,72.58,'Dự án Imperia Smart City, Đường Đại lộ Thăng Long, Phường Tây Mỗ, Nam Từ Liêm, Hà Nội',105.762752000000000,20.991636000000000,NULL,NULL,NULL,1,'2025-12-05 13:23:54.576030','2025-12-08 03:02:56.657775',1,42,1,5,18,'properties/property/3de94107d36441f6ac9dbdfd6a83bb65.jpg1764941034_575307',NULL,5,'ban','approved');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-13  0:38:11
