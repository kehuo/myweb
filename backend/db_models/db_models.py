# @File: db_models.py
# @Author: Kevin Huo
# @Date: 2020/4/7


from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, nullable=Fals, comment="每个用户的唯一id")
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


class Comment(Base):
    """网站评论"""
    __tablename__ = 'comment'
    id = Column(Integer, autoincrement=True, primary_key=True)
    comment_id = Column(Integer, nullable=False, comment="每条评论的唯一id")
    content = Column(String(128), nullable=False, comment="评论具体内容")
    email = Column(String(64), nullable=True, default=0)

    created_at = Column(DateTime, nullable=False, default=datetime.now, comment="该评论的创建者")
    created_by = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    updated_by = Column(Integer, nullable=False, default=0)