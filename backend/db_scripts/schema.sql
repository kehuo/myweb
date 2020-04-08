DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色id',
  `user_id` varchar(64) NOT NULL COMMENT '用户唯一id, 使用uuid5生成',
  `name` varchar(64) NOT NULL COMMENT '用户账号',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '用户密码',
  `realname` varchar(64) NOT NULL COMMENT '用户真实姓名',
  `email` varchar(64) DEFAULT '' COMMENT '电子邮箱',
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT 0 COMMENT "即 user id",
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(64) NOT NULL DEFAULT '' COMMENT '每条评论的一条唯一编号, uuid5生成',
  `content` varchar(128) NOT NULL DEFAULT '' COMMENT '具体评论的内容',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_comment_id` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
