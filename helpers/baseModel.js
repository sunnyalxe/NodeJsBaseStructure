import knexDb from "../db/database.js";

class BaseModel {
  constructor({
    name = "name",
    tableName = "tablename",
    exposedFields = [],
    timeout = 1000,
  }) {
    this.db = knexDb;
    this.name = name;
    this.tableName = tableName;
    this.exposedFields = exposedFields;
    this.timeout = timeout;
  }

  async create(props) {
    delete props.id;
    props['created_at'] = this.db.fn.now()
    return await this.db
      .insert(props)
      .returning(this.exposedFields)
      .into(this.tableName)
      .timeout(this.timeout);
  }

  async findAll() {
    return await this.db
      .select(this.exposedFields)
      .from(this.tableName)
      .timeout(this.timeout);
  }

  async find(filters,selectFields = []) {
    if(selectFields.length === 0)
    {
      selectFields = this.exposedFields;
    }
    const res = await this.db
      .select(selectFields)
      .from(this.tableName)
      .where(filters)
      .timeout(this.timeout);
    return res;
  }

  async findOne(filters) {
    const results = await this.find(filters);
    return Array.isArray(results) ? results[0] : results;
  }

  async findById(id) {
    return await this.db
      .select(this.exposedFields)
      .from(this.tableName)
      .where({ id })
      .timeout(this.timeout);
  }

  async update(id, props) {
    delete props.id;
    return await this.db
      .update(props)
      .from(this.tableName)
      .where({ id })
      .returning(this.exposedFields)
      .timeout(this.timeout);
  }

  async destroy(id) {
    return await this.db
      .del()
      .from(this.tableName)
      .where({ id })
      .timeout(this.timeout);
  }
}

export default BaseModel;
