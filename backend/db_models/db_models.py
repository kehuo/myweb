# @File: db_models.py
# @Author: Kevin Huo
# @Date: 2020/4/7


from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, nullable=False, unique=True, comment="每个用户的唯一id, uuid5生成")
    role_id = Column(Integer, nullable=False)
    name = Column(String(64), nullable=False)
    password = Column(String(64), nullable=False)
    realname = Column(String(64), nullable=False, comment="用户真实姓名")
    email = Column(String(64), nullable=True, default=0)
    disabled = Column(Integer, nullable=False)

    created_at = Column(DateTime, nullable=False, default=datetime.now)
    created_by = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    updated_by = Column(Integer, nullable=False, default=0)


class Role(Base):
    """
    1-admin / 2-vip / 3-enduser / 4-guest
    """
    __tablename__ = "role"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(64), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    created_by = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    updated_by = Column(Integer, nullable=False, default=0)


class Comment(Base):
    """网站评论"""
    __tablename__ = "comment"
    id = Column(Integer, autoincrement=True, primary_key=True)
    comment_id = Column(String(128), nullable=False, comment="每条评论的唯一id, uuid5生成")
    content = Column(String(128), nullable=False, comment="评论具体内容")
    creator_user_id = Column(String(128), nullable=False, comment="创建评论的user_id")

    created_at = Column(DateTime, nullable=False, default=datetime.now)
    created_by = Column(Integer, nullable=False, default=0, comment="该评论的创建者")
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    updated_by = Column(Integer, nullable=False, default=0)