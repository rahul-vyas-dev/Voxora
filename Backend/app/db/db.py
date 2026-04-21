from sqlalchemy import create_engine
from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
import os

load_dotenv()

CONNECTION_URL = os.getenv("connection_string")

try:
    engine = create_engine(str(CONNECTION_URL), echo=True)
    sessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False
    )
    print("Your engine is successfully created:", engine)
except SQLAlchemyError as e:
    print("Error during create_engine:", e)


def get_db():
    session = sessionLocal()
    try:
        yield session
    except Exception as e:
        print("Error during session initialization:", e)
    finally:
        session.close()
        print('Sessoin terminated')
