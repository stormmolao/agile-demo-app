from models import AgileValues, AgilePrinciples, db

def get_agile_values():
    return [
        {
            "id": item.id,
            "title": item.title,
            "content": item.content
        } 
        for item in AgileValues.query.all() 
    ]

def add_agile_value(new_agile_value):
    agileValueRecord = AgileValues(
        title = new_agile_value['title'], 
        content = new_agile_value['content']
    )
    db.session.add(agileValueRecord)
    db.session.commit()

def update_agile_value(agile_value_id, update_obj):
    agileValueRecord = AgileValues.query.get(agile_value_id)
    if agileValueRecord is None:
        raise Exception("Not exit record")
    agileValueRecord.title = update_obj['title']
    agileValueRecord.content = update_obj['content']
    db.session.commit()

def delete_agile_value(agile_value_id):
    agileValueRecord = AgileValues.query.get(agile_value_id)
    if agileValueRecord is None:
        raise Exception("Not exit record")
    db.session.delete(agileValueRecord)
    db.session.commit()

def get_agile_principles():
    return [
        {
            "id": item.id,
            "title": item.title,
            "content": item.content
        } 
        for item in AgilePrinciples.query.all() 
    ]

def add_agile_principle(new_agile_principle):
    agilePrincipleRecord = AgilePrinciples(
        title = new_agile_principle['title'], 
        content = new_agile_principle['content']
    )
    db.session.add(agilePrincipleRecord)
    db.session.commit()

def update_agile_principle(agile_principle_id, update_obj):
    agilePrincipleRecord = AgilePrinciples.query.get(agile_principle_id)
    if agilePrincipleRecord is None:
        raise Exception("Not exit record")
    agilePrincipleRecord.title = update_obj['title']
    agilePrincipleRecord.content = update_obj['content']
    db.session.commit()

def delete_agile_principle(agile_principle_id):
    agilePrincipleRecord = AgilePrinciples.query.get(agile_principle_id)
    if agilePrincipleRecord is None:
        raise Exception("Not exit record")
    db.session.delete(agilePrincipleRecord)
    db.session.commit()